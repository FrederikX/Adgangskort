const now = new Date();
let age = 18;
let name = "Alfred Lund Andersen";

const randomMonths = Math.floor(Math.random() * 3) + 3;
const randomDays = Math.floor(Math.random() * 20) + 1;

let kontrolBottomId

let birthYear = now.getFullYear() - age;
let birthMonth = now.getMonth() + 1 - randomMonths;
let birthDay = now.getDate() - randomDays;

if (birthDay < 1) {
  birthMonth -= 1;
  let prevMonth = birthMonth < 1 ? 12 : birthMonth;
  let prevYear = birthMonth < 1 ? birthYear - 1 : birthYear;
  birthDay += new Date(prevYear, prevMonth, 0).getDate();
}
if (birthMonth < 1) {
  birthMonth += 12;
  birthYear -= 1;
}

let birthDateString = `${birthDay}.${birthMonth}.${birthYear}`;

function getDanishDateString(date) {
  const months = [
    'januar', 'februar', 'marts', 'april', 'maj', 'juni',
    'juli', 'august', 'september', 'oktober', 'november', 'december'
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${day} ${month} ${year} kl ${hour}:${minute}`;
}

const footerIcons = [
  { name: 'Kort', img: 'images/Kort.png', imgGray: 'images/Kort-grå.png' },
  { name: 'Info', img: 'images/info.png', imgGray: 'images/info-grå.png' },
  { name: 'Scan', img: 'images/Scan.png', imgGray: 'images/Scan-grå.png' },
  { name: 'Kontrol', img: 'images/Kontrol.png', imgGray: 'images/Kontrol-grå.png' }
];

let pinChecked = false;
let savedIdPhotoPath = '';

function showPage(page) {
  if (window.qrInterval) {
    clearInterval(window.qrInterval);
    window.qrInterval = null;
  }

  const content = document.querySelector('.content');
  const body = document.querySelector('.scan');
  if (!content) return;

  if (page === 'Kort') {
    // Show the header
    document.getElementById('main-header').style.display = 'flex'; // or 'block', depending on your layout
    document.getElementById('main-content').style.marginTop = '5vh';
    document.getElementById('main-content').style.height = '88vh';

    content.innerHTML = `
      <div class="id-content">
        <img src="images/Id-background.png" alt="ID Image">
        <div class="id-content-name"></div>
        <div class="id-content-age">${age + ' år'}</div>
        <div class="id-content-birthyear">${birthDateString}</div>
        <div class="id-content-number">${'20712936'}</div>
        <div class="id-content-update"></div>
        <div class="Id-star">
          <img src="images/Id-star.png" alt="Star">
        </div>
        <div class="id-foto-background">
          <img src="${savedIdPhotoPath || 'images/IMG_5896.png'}" class="id-foto" alt="ID Photo">
        </div>
      </div>
    `;
    // Apply a line split between first and middle/last name
    const nameDiv = document.querySelector('.id-content-name');
    const nameParts = name.split(' ');
    let firstName = nameParts[0] || '';
    let restName = nameParts.slice(1).join(' ');
    nameDiv.innerHTML = `<span style='display:block;text-align:left;'>${firstName}</span>` +
      (restName ? `<span style='display:block;text-align:left;'>${restName}</span>` : '');
    const updateDiv = document.querySelector('.id-content-update');
    if (updateDiv) {
      updateDiv.textContent = getDanishDateString(now);
    }
    if (!pinChecked) {  // Only prompt for PIN if not already checked
      setIdPhotoByCode();
      pinChecked = true;
    }

  }else if (page === 'Info') {
    // Show the header
    document.getElementById('main-header').style.display = 'flex'; // or 'block', depending on your layout
    document.getElementById('main-content').style.marginTop = '5vh';
    document.getElementById('main-content').style.height = '88vh';

    content.innerHTML = `
      <div style="width:100vw;height:88vh;display:flex;align-items:center;justify-content:center;"></div>
      
      <div class="info-content">
        <img class="" src="images/Info-content.png" alt="Info content">
        <div class="info-cpr">${kontrolBottomId}</div>
        <div class="info-nummer">20712936</div>
        <div class="info-udstedt">${age}</div>
        <div class="info-gyldig">${age+15}</div>
        <div class="info-fødested">Danmark</div>
      </div>
      `;

  } else if (page === 'Scan') {
    // Hide the header
    document.getElementById('main-header').style.display = 'none';
    document.getElementById('main-content').style.marginTop = '0vw';
    document.getElementById('main-content').style.height = '93vh';

    content.innerHTML = `
      <div style="width:100vw;height:88vh;display:flex;align-items:center;justify-content:center;"></div>
      
      <div class="scan-camera">

        <div class="scan-camera-header">Scan kørekortets QR-kode</div>
        <div class="scan-camera-animation">
          <img class="animation1" src="images/animation1.png" alt="animation">
          <img class="animation2" src="images/animation2.png" alt="animation">
        </div>
        <div class="scan-camera-perimeter">
          <img src="images/scan-perimeter.png" alt="Camera perimeter">
        </div>
        <div class="scan-camera-bottom">Kontrollér id ved at scanne kørekort-appen</div>
      </div>
      
      `;
  } else if (page === 'Kontrol') {
    // Show the header
    document.getElementById('main-header').style.display = 'flex'; // or 'block', depending on your layout
    document.getElementById('main-content').style.marginTop = '5vh';
    document.getElementById('main-content').style.height = '88vh';

    content.innerHTML = `
      <div style="width:100vw;height:88vh;display:flex;align-items:center;justify-content:center;"></div>
      

      <div class="kontrol-qr">
        <img id="kontrol-qr-image" src="images/QR1.png" alt="QR Code">
      </div>
      <div class="kontrol-content">
        <div class="kontrol-header">
            <img src="images/kontrol-header.png" alt="QR Code">
        </div>

        <div class="kontrol-politi">
            <img class="kontrol-politi-image" src="images/kontrol-politi.png" alt="Politi">
        </div>

        <div class="kontrol-bottom">
            <img src="images/Kontrol-bottom.png" alt="Bottom Image">
            <div class="kontrol-bottom-name">${name}</div>
            <div class="kontrol-bottom-id">${kontrolBottomId}</div>

            <div class="kontrol-bottom-image">
                <img src="${savedIdPhotoPath || 'images/IMG_5896.png'}" class="id-foto" alt="ID Photo">
            </div>
        </div>
      </div>
    `;

    // Switch QR code every 150ms
    let qrToggle = false;
    const qrImage = document.getElementById('kontrol-qr-image');
    if (qrImage) {
      window.qrInterval = setInterval(() => {
        qrToggle = !qrToggle;
        qrImage.src = qrToggle ? 'images/QR2.png' : 'images/QR1.png';
      }, 150);
    }
  } else if (page === 'Menu') {
    content.innerHTML = `
      <div style="width:100vw;height:88vh;display:flex;align-items:center;justify-content:center;"></div>
      
    `;

    // Switch QR code every 150ms
    let qrToggle = false;
    const qrImage = document.getElementById('kontrol-qr-image');
    if (qrImage) {
      window.qrInterval = setInterval(() => {
        qrToggle = !qrToggle;
        qrImage.src = qrToggle ? 'images/QR2.png' : 'images/QR1.png';
      }, 150);
    }
  }
}

function loadFooterIcons(selectedIndex = 0) {
  const footer = document.querySelector('.footer');
  footer.innerHTML = '';
  footerIcons.forEach((icon, idx) => {
    const div = document.createElement('div');
    div.className = icon.name;
    const img = document.createElement('img');
    img.src = idx === selectedIndex ? icon.img : icon.imgGray;
    img.alt = icon.name;
    div.appendChild(img);
    div.addEventListener('click', () => {
      loadFooterIcons(idx);
      showPage(icon.name);
    });
    footer.appendChild(div);
  });
}

function setIdPhotoByCode() {
  let code = '';
  const overlay = document.getElementById('black-overlay');


  

  function trySetPhoto(kode) {
    return new Promise((resolve) => {
      if (!/^\d{4}$/.test(kode)) {
        resolve(false);
        return;
      }

      const tryExtensions = ['png', 'JPG'];
      let extIdx = 0;

      function tryNextExt() {
        if (extIdx >= tryExtensions.length) {
          resolve(false);
          return;
        }

        const imgPath = `Id-fotos/${kode}.${tryExtensions[extIdx]}`;
        const testImg = new window.Image();
        testImg.src = imgPath;

        testImg.onload = function () {
        savedIdPhotoPath = imgPath;

        // Update ID photo
        const idFoto = document.querySelector('.id-foto');
        if (idFoto) {
            idFoto.src = imgPath;
            idFoto.alt = `ID Photo for ${kode}`;
        }

        // Update Kontrol bottom image
        const kontrolImg = document.querySelector('.kontrol-bottom-image');
        if (kontrolImg) {
            kontrolImg.src = imgPath;
            kontrolImg.alt = `Kontrol Photo for ${kode}`;
        }

        resolve(true);
        };

        testImg.onerror = function () {
          extIdx++;
          tryNextExt();
        };
      }

      tryNextExt();
    });
  }

  async function promptLoop() {
    while (true) {
      code = prompt('Indtast din 4-cifrede kode for at vise dit ID-foto:');
      if (code === null) return;

      const success = await trySetPhoto(code);
      if (success) {
        if (overlay) overlay.style.display = 'none';

        

        let newAge = null;
        while (true) {
          newAge = prompt('Indtast din alder:');
          if (newAge === null) break;
          newAge = parseInt(newAge);
          if (!isNaN(newAge) && newAge > 0 && newAge < 120) {
            age = newAge;
            updateBirthdateFromAge();

            const first = firstNames[Math.floor(Math.random() * firstNames.length)];
            const middle = middleNames[Math.floor(Math.random() * middleNames.length)];
            const last = lastNames[Math.floor(Math.random() * lastNames.length)];
            name = `${first} ${middle} ${last}`;

            kontrolBottomId = generateKontrolBottomId(birthDateString);

            break;
          }
        }

        const warningOverlay = document.getElementById('warning-overlay');
        const warningImg = document.getElementById('warning-img');
        if (warningOverlay && warningImg) {
          warningOverlay.style.display = 'flex';
          warningImg.style.opacity = '1';
          setTimeout(() => {
            warningImg.style.opacity = '0';
            setTimeout(() => {
              warningOverlay.style.display = 'none';
            }, 500);
          }, 3000);
        }

        showPage('Kort');
        break;
      }

      alert('Ugyldig kode: intet billede fundet. Prøv igen.');
    }
  }

  promptLoop();
}

function updateBirthdateFromAge() {
  const now = new Date();
  const randomMonths = Math.floor(Math.random() * 3) + 3;
  const randomDays = Math.floor(Math.random() * 20) + 1;

  let birthYear = now.getFullYear() - age;
  let birthMonth = now.getMonth() + 1 - randomMonths;
  let birthDay = now.getDate() - randomDays;

  if (birthDay < 1) {
    birthMonth -= 1;
    let prevMonth = birthMonth < 1 ? 12 : birthMonth;
    let prevYear = birthMonth < 1 ? birthYear - 1 : birthYear;
    birthDay += new Date(prevYear, prevMonth, 0).getDate();
  }

  if (birthMonth < 1) {
    birthMonth += 12;
    birthYear -= 1;
  }

  birthDateString = `${birthDay}.${birthMonth}.${birthYear}`;
}

function generateKontrolBottomId(birthDateStr) {
  const parts = birthDateStr.split('.');
  const dd = parts[0].padStart(2, '0');
  const mm = parts[1].padStart(2, '0');
  const yy = parts[2].slice(-2);
  const suffix = '-' + String(Math.floor(1000 + Math.random() * 9000));
  return `${dd}${mm}${yy}${suffix}`;
}


const firstNames = ["Alfred", "Frederik", "Lucas", "Mads", "Noah", "William", "Magnus", "Peter", "Christian"];
const middleNames = ["Lund", "Emil", "Johan", "Anders", "Oscar"];
const lastNames = ["Andersen", "Jensen", "Nielsen", "Hansen", "Pedersen", "Møller", "Thomsen", "Poulsen", "Knudsen"];

document.addEventListener('DOMContentLoaded', function () {
  showPage('Kort');
  loadFooterIcons(0);
});
