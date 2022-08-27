window.addEventListener('DOMContentLoaded', init);


function init() {

    // サイズを指定
    const width = window.innerWidth;
    const height = 540;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#cardCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, 10);

    // ライト
    var light = new THREE.AmbientLight( 0xffffff );
    scene.add( light );


    var texture = new THREE.TextureLoader().load('../images/足利尊氏.png', (tex) => { // 読み込み完了時
        // 縦横比を保って適当にリサイズ
        const w = 5;
        const h = tex.image.height/(tex.image.width/w);

        // 平面
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshPhongMaterial( { map:texture } );
        const plane = new THREE.Mesh( geometry, material );
        plane.scale.set(w, h, 1);
        scene.add( plane );

        tick();

        // 毎フレーム時に実行されるループイベントです
        function tick() {
            plane.rotation.y += 0.01;
            plane.rotation.x += 0.01;
            plane.rotation.z += 0.01;
            renderer.render(scene, camera); // レンダリング
            requestAnimationFrame(tick);
        }
    });

}


// function init() {

//     // サイズを指定
//     const width = 960;
//     const height = 540;

//     // レンダラーを作成
//     const renderer = new THREE.WebGLRenderer({
//     canvas: document.querySelector('#cardCanvas')
//     });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(width, height);

//     // シーンを作成
//     const scene = new THREE.Scene();

//     // カメラを作成
//     const camera = new THREE.PerspectiveCamera(45, width / height);
//     camera.position.set(0, 0, +1000);

//     // 箱を作成
//     const geometry = new THREE.BoxGeometry(400, 400, 400);
//     const material = new THREE.MeshNormalMaterial();
//     const box = new THREE.Mesh(geometry, material);
//     scene.add(box);

//     tick();

//     // 毎フレーム時に実行されるループイベントです
//     function tick() {
//     box.rotation.y += 0.01;
//     renderer.render(scene, camera); // レンダリング

//     requestAnimationFrame(tick);
//     }
// }