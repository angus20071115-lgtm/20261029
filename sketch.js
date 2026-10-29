// 載入橫向排列的角色精靈圖。
let characterSheet; // 保存角色的九格精靈圖。
let characterX; // 保存角色目前的水平位置。
let characterY; // 保存角色目前的垂直位置。
let facing = 1; // 設定角色初始朝右，1 代表右方、-1 代表左方。
let currentFrame = 0; // 記錄目前播放的精靈影格。
let lastFrameTime = 0; // 記錄上次切換影格的時間。
const frameCount = 9; // 設定精靈圖包含九張圖片。
const frameWidth = 1246 / frameCount; // 依照圖片總寬計算每格的寬度。
const frameHeight = 198; // 設定每格精靈圖片的高度。
const characterSpeed = 4; // 設定角色每次繪製時的移動速度。
const animationInterval = 100; // 設定每隔 100 毫秒切換一張影格。

function preload() { // 在畫布建立前載入角色圖片。
  characterSheet = loadImage("1/w/allw.png"); // 載入指定路徑的精靈圖。
} // 結束圖片載入函式。

function setup() { // 設定畫布與角色初始狀態。
  createCanvas(windowWidth, windowHeight); // 建立符合視窗大小的畫布。
  imageMode(CENTER); // 讓角色座標代表圖片中心點。
  characterX = width / 2; // 將角色放在畫布水平中央。
  characterY = height / 2; // 將角色放在畫布垂直中央。
} // 結束初始設定函式。

function draw() { // 每個動畫影格更新並繪製畫面。
  background("#caf0f8"); // 使用指定的淺藍色清除畫布。
  const isMoving = keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW); // 確認是否按住任一方向鍵。

  if (keyIsDown(RIGHT_ARROW)) { // 檢查是否持續按住右方向鍵。
    characterX += characterSpeed; // 讓角色往右移動。
    facing = 1; // 讓角色面向右方。
  } // 結束右方向鍵判斷。

  if (keyIsDown(LEFT_ARROW)) { // 檢查是否持續按住左方向鍵。
    characterX -= characterSpeed; // 讓角色往左移動。
    facing = -1; // 讓角色面向左方。
  } // 結束左方向鍵判斷。

  characterX = constrain(characterX, frameWidth / 2, width - frameWidth / 2); // 限制角色不超出畫布左右邊界。

  if (isMoving && millis() - lastFrameTime >= animationInterval) { // 只有移動時才切換動畫影格。
    currentFrame = (currentFrame + 1) % frameCount; // 前進一格並在最後一格後回到第一格。
    lastFrameTime = millis(); // 更新上次切換影格的時間。
  } // 結束動畫影格更新判斷。

  push(); // 暫存目前的繪圖狀態。
  translate(characterX, characterY); // 將座標原點移至角色位置。
  scale(facing, 1); // 依角色方向決定是否水平翻轉圖片。
  image(characterSheet, 0, 0, frameWidth, frameHeight, currentFrame * frameWidth, 0, frameWidth, frameHeight); // 擷取並繪製目前的精靈影格。
  pop(); // 還原繪圖狀態以避免影響其他畫面元素。
} // 結束畫面更新函式。

function windowResized() { // 視窗尺寸改變時同步調整畫布。
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的視窗大小。
  characterX = constrain(characterX, frameWidth / 2, width - frameWidth / 2); // 調整角色位置以符合新畫布邊界。
  characterY = constrain(characterY, 0, height); // 確保角色垂直位置仍在畫布範圍內。
} // 結束視窗尺寸調整函式。
