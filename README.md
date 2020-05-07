server_20200409
===============

webgl 연습중
------------

* ./game.html
    - 현재 프론트페이지
* ./scripts/
    - 원본 소스
    * ./scripts/gl-matrix.js
        - webgl module
    * ./scripts/graphic.ts
        - mdn예제를 따라해보고 Typescript로 옮김
    * ./scripts/*.js
        - 이후 아이디어 구현하며 작성할 파일
        - 아직 작성하지 않음, Typescript로 작성예정
* ./outScripts/
    - 원본 소스를 tsc로 컴파일 (tsconfig.json이 설정파일)
    - 이 디렉토리를 /scripts/로 라우팅 (webserver.js에서)