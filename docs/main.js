console.log("loaded!");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const headerNavUlLiAs = document.querySelectorAll("header nav ul li a");
const headerNavUl = document.querySelector("header nav ul");

const toggleHamburgerMenu = () => {
    headerNavUl.classList.toggle("active");
}

hamburgerBtn.addEventListener("click", toggleHamburgerMenu);
headerNavUlLiAs.forEach(elem => elem.addEventListener("click", toggleHamburgerMenu));


// const saleStartTime = new Date("2023-02-21 09:00:00");
// const baseURL = "https://historycard.base.shop/items/69914853";

// if (new Date().getTime() > saleStartTime.getTime()) {
//     document.querySelectorAll(".purchaseButton").forEach(elem => {
//         elem.href = baseURL;
//         elem.target = "_blank";
//         elem.rel = "noopener noreferrer";
//     });
//     document.querySelectorAll(".purchaseButton span").forEach(elem => {
//         elem.innerText = "購入はこちら！";
//     });
// }

const saleStartTime = new Date("2023-05-13 11:00:00");
const baseURL = "https://historycard.base.shop/";

if (new Date().getTime() > saleStartTime.getTime()) {
    document.querySelectorAll(".purchaseButton").forEach(elem => {
        elem.href = baseURL;
        elem.target = "_blank";
        elem.rel = "noopener noreferrer";
    });
    document.querySelectorAll(".purchaseButton span").forEach(elem => {
        elem.innerText = "購入はこちら";
    });
}



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



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




// カードが回るやつ
let imageNamesList = {
    heianKamakura: ["平安_08.webp", "平安_10.webp", "平安_11.webp", "平安_14.webp", "平安_17.webp"],
    bakumatsu: ["幕末_02.webp", "幕末_04.webp", "幕末_13.webp", "幕末_15.webp", "幕末_17.webp"],
    sengoku: ["戦国_11.webp", "戦国_13.webp", "戦国_15.webp", "戦国_16.webp", "戦国_17.webp"],
    gendai: ["現代_01.webp", "現代_02.webp", "現代_03.webp", "現代_04.webp", "現代_05.webp"],
};

let shouldAnimate = true;
const canvas = document.querySelector('#cardCanvas');


window.addEventListener('DOMContentLoaded', () => init(imageNamesList["heianKamakura"]));




// 10枚のカードの画像が円形に回る
async function init(imageNames) {
    // 既存のアニメーションを停止
    shouldAnimate = false;
    let wait300ms = sleep(300);

    // サイズを指定
    const displaySize = window.innerWidth;
    let width = 900;
    if (displaySize < 1000) width = displaySize - 50;
    const height = 540;

    let cameraDistance = 250;

    if (displaySize < 700) {
        cameraDistance = 500;
        width = displaySize;
        canvas.style.transform = "translateX(-50px)"
    };


    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, cameraDistance);

    // ライト
    // const light = new THREE.AmbientLight( 0xffffff );
    const light = new THREE.DirectionalLight(0xcccccc, 1);
    light.position.set(0, 10, 5000);
    scene.add(light);


    // 背景
    const backTexture = await new THREE.TextureLoader().load(`images/three_back_stop.png`);
    // const backTexture = await new THREE.TextureLoader().load(`images/three_back_move.gif`);
    const back = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000, 1, 1),
        new THREE.MeshPhongMaterial({ map: backTexture })
    );
    back.position.set(0, 0, -500);
    scene.add(back);



    group = new THREE.Group();
    scene.add(group);


    // const size = 10;
    // const step = 1;

    // const gridHelper = new THREE.GridHelper(size, step, "#f5f5f5");
    // scene.add(gridHelper);


    const cardNum = imageNames.length;

    for (let i = 0; i < cardNum; i++) {
        const texture = await new THREE.TextureLoader().load(`images/cards_new/${imageNames[i]}`);
        // 縦横比を保って適当にリサイズ
        const h = 100;
        const w = Math.round(h * 743 / 1038);
        // console.log(texture);

        // 平面
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshPhongMaterial({ map: texture });
        const plane = new THREE.Mesh(geometry, material);
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

    // 新しいアニメーションを開始
    await wait300ms;
    shouldAnimate = true;
    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        if (!shouldAnimate) {
            return;
        }
        group.rotation.y += 0.005;
        group.children.forEach(elem => elem.rotation.y -= 0.005);

        // レンダリング
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

}


const selectShowLis = [...document.querySelectorAll("#selectShow ul li")];

selectShowLis.forEach(li => li.addEventListener("click", (e) => {
    selectShowLis.forEach(allLi => allLi.classList.remove("is_active"));
    e.target.classList.add("is_active");

    init(imageNamesList[e.target.id]);
}))


