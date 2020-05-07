server_20200409
===============

webgl 연습중
------------

* ./game.html
    - 현재 프론트페이지
* ./webserver.js
    - node.js로 실행시 서버 켜짐
* ./scripts/
    - 원본 소스
    * ./scripts/gl-matrix.js
        - webgl module
    * ./scripts/graphic.ts
        - mdn예제를 따라해보고 Typescript로 옮김
        - https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
    * ./scripts/*.js
        - 이후 아이디어 구현하며 작성할 파일
        - 아직 작성하지 않음, Typescript로 작성예정
* ./outScripts/
    - 원본 소스를 tsc로 컴파일 (tsconfig.json이 설정파일)
    - 이 디렉토리를 /scripts/로 라우팅 (webserver.js에서)
* ./texture/
    - webgl로 만들 앱의 그림파일

+ 실행방법
    1. $tsc
    2. $node webserver.js

+ 현재 branch(master)는 그대로 두고 새 branch(webglUsingTexture)에서 커밋할것.
    - 커밋하면 branch를 옮길 수 없다.