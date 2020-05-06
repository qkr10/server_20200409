//
// see https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
//
define(["require", "exports", "./gl-matrix"], function (require, exports, gl_matrix_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function main() {
        var canvas = document.querySelector("#canvas");
        gl = canvas.getContext("webgl", {
            antialias: false,
            depth: false
        });
        if (gl === null) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }
        var vsSource = "\n    attribute vec4 aVertexPosition;\n    attribute vec4 aVertexColor;\n\n    uniform mat4 uModelViewMatrix;\n    uniform mat4 uProjectionMatrix;\n\n    varying lowp vec4 vColor;\n\n    void main() {\n        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;\n        vColor = aVertexColor;\n    }\n    ";
        var fsSource = "\n    varying lowp vec4 vColor;\n\n    void main() {\n        gl_FragColor = vColor;\n    }\n    ";
        var shaderProgram = initShaderProgram(gl, vsSource, fsSource);
        programInfo = {
            program: shaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
                vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
                modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
            },
        };
        buffers = initBuffers(gl);
        requestAnimationFrame(render);
    }
    main();
    var programInfo, buffers, gl;
    var then = 0, squareRotation = 0;
    function render(now) {
        now *= 0.001;
        var deltaTime = now - then;
        then = now;
        drawScene(gl, programInfo, buffers, deltaTime);
        requestAnimationFrame(render);
    }
    function initShaderProgram(gl, vsSource, fsSource) {
        var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
        var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }
        return shaderProgram;
    }
    function loadShader(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    function initBuffers(gl) {
        var positions = [
            1.0, 1.0,
            -1.0, 1.0,
            1.0, -1.0,
            -1.0, -1.0,
        ];
        var positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        var colors = [
            1.0, 1.0, 1.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
        ];
        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        return {
            position: positionBuffer,
            color: colorBuffer,
        };
    }
    function drawScene(gl, programInfo, buffers, deltaTime) {
        if (deltaTime === void 0) { deltaTime = 0; }
        gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
        gl.clearDepth(1.0); // Clear everything
        gl.enable(gl.DEPTH_TEST); // Enable depth testing
        gl.depthFunc(gl.LEQUAL); // Near things obscure far things
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var fieldOfView = 45 * Math.PI / 180; // in radians
        var aspect = gl.canvas.width / gl.canvas.height;
        var zNear = 0.1;
        var zFar = 100.0;
        var projectionMatrix = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
        var modelViewMatrix = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.translate(modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to translate
        [-0.0, 0.0, -6.0]); // amount to translate
        squareRotation += deltaTime;
        gl_matrix_1.mat4.rotate(modelViewMatrix, modelViewMatrix, squareRotation, [0, 0, 1]);
        {
            var numComponents = 2; // pull out 2 values per iteration
            var type = gl.FLOAT; // the data in the buffer is 32bit floats
            var normalize = false; // don't normalize
            var stride = 0; // how many bytes to get from one set of values to the next
            // 0 = use type and numComponents above
            var offset = 0; // how many bytes inside the buffer to start from
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
            gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
            gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
        }
        {
            var numComponents = 4; // pull out 2 values per iteration
            var type = gl.FLOAT; // the data in the buffer is 32bit floats
            var normalize = false; // don't normalize
            var stride = 0; // how many bytes to get from one set of values to the next
            // 0 = use type and numComponents above
            var offset = 0; // how many bytes inside the buffer to start from
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
            gl.vertexAttribPointer(programInfo.attribLocations.vertexColor, numComponents, type, normalize, stride, offset);
            gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
        }
        gl.useProgram(programInfo.program);
        gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
        gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
        {
            var offset = 0;
            var vertexCount = 4;
            gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
        }
    }
});
