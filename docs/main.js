console.log("loaded!");
const hamburgerBtn = document.getElementById("hamburgerBtn");
hamburgerBtn.addEventListener("click", (e) => {
    document.querySelector("header nav ul").classList.toggle("active");
});



let popUpTargets = document.querySelectorAll('.scrollPopUp,.scrollLeftPop,.scrollRightPop');

window.addEventListener('scroll', function () {
    var scroll = window.scrollY; //スクロール量を取得
    var windowHeight = window.innerHeight; //画面の高さを取得
    for (let target of popUpTargets) { //ターゲット要素がある分、アニメーション用のクラスをつける処理を繰り返す
        var targetPos = target.getBoundingClientRect().top + scroll; //ターゲット要素の位置を取得
        if (scroll > targetPos - windowHeight) { //スクロール量 > ターゲット要素の位置
            target.classList.add('blockIn');
        }
    }
});


const QTexts = document.querySelectorAll(".QText");

QTexts.forEach(QText => {
    QText.addEventListener("click", (e) => {
        e.target.classList.toggle("openA");
        e.target.nextElementSibling.classList.toggle("openA");
    })
})




// カードが回るやつ
window.addEventListener('DOMContentLoaded', init);


// 10枚のカードの画像が円形に回る
async function init() {

    // サイズを指定
    const displaySize = window.innerWidth;
    let width = 900;
    if(displaySize < 1000) width = displaySize - 100;
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
    // const light = new THREE.AmbientLight( 0xffffff );
    const light = new THREE.DirectionalLight(0xcccccc, 1);
    light.position.set(0, 10, 5000);
    scene.add( light );

    // グループを作る
    const group = new THREE.Group();
    // 3D空間にグループを追加する
    scene.add(group);

    const size = 10;
    const step = 1;

    const gridHelper = new THREE.GridHelper(size, step, "#f5f5f5");
    scene.add(gridHelper);


    const imageNames = ["源義経.png", "高杉晋作.png", "坂本龍馬.png", "清少納言.png", "平将門.png"];
    const cardNum = imageNames.length;

    for(let i = 0; i < cardNum; i++){
        const texture = await new THREE.TextureLoader().load(`images/cards/${imageNames[i]}`)
        // 縦横比を保って適当にリサイズ
        const h = 100;
        const w = Math.round(h * 743 / 1038);
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