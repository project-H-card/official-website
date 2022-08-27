window.addEventListener('DOMContentLoaded', init);

const cardNum = 10;


// 10枚のカードの画像が円形に回る
async function init() {

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
    camera.position.set(0, 0, 250);

    // ライト
    const light = new THREE.AmbientLight( 0xffffff );
    scene.add( light );

    // グループを作る
    const group = new THREE.Group();
    // 3D空間にグループを追加する
    scene.add(group);


    for(let i = 0; i < cardNum; i++){
        const texture = await new THREE.TextureLoader().load('../images/足利尊氏.png')
        // 縦横比を保って適当にリサイズ
        const w = 50;
        const h = 100;
        // console.log(texture);

        // 平面
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshPhongMaterial( { map:texture } );
        const plane = new THREE.Mesh( geometry, material );
        plane.scale.set(w, h, 1);

        // 配置座標を計算
        const radian = i / cardNum * Math.PI * 2;
        plane.position.set(
            100 * Math.cos(radian), // X座標
            10, // Y座標
            100 * Math.sin(radian) // Z座標
        );

        group.add(plane);
    }


    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        group.rotation.y += 0.005;
        group.children.forEach(elem => elem.rotation.y -= 0.005);

        // レンダリング
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

}




// 足利尊氏が回る
// function init() {

//     // サイズを指定
//     const width = window.innerWidth;
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
//     camera.position.set(0, 0, 10);

//     // ライト
//     var light = new THREE.AmbientLight( 0xffffff );
//     scene.add( light );


//     var texture = new THREE.TextureLoader().load('../images/足利尊氏.png', (tex) => { // 読み込み完了時
//         // 縦横比を保って適当にリサイズ
//         const w = 5;
//         const h = tex.image.height/(tex.image.width/w);

//         // 平面
//         const geometry = new THREE.PlaneGeometry(1, 1);
//         const material = new THREE.MeshPhongMaterial( { map:texture } );
//         const plane = new THREE.Mesh( geometry, material );
//         plane.scale.set(w, h, 1);
//         scene.add( plane );

//         tick();

//         // 毎フレーム時に実行されるループイベントです
//         function tick() {
//             plane.rotation.y += 0.01;
//             plane.rotation.x += 0.01;
//             plane.rotation.z += 0.01;
//             renderer.render(scene, camera); // レンダリング
//             requestAnimationFrame(tick);
//         }
//     });

// }


// ただの立方体
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