document.addEventListener('DOMContentLoaded', () => {
    // --- WIB CLOCK (UTC+7) ---
    const clockEl = document.getElementById('wib-clock');
    function updateClock() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Jakarta',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const timeString = now.toLocaleString('en-GB', options);
        clockEl.textContent = `${timeString} WIB`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- INVENTORY DATA ---
const inventoryData = {
    'zone-human': [
        { id: 'HC-01', name: 'Jasa Curhat', price: 'Rp12.000', category: 'HUMAN CONTROL' },
        { id: 'HC-02', name: 'Jasa Mainin Akun', price: 'Rp15.000', category: 'HUMAN CONTROL' },
        { id: 'HC-03', name: 'Jasa Diving Story, Channel, Personal', price: 'Rp18.000', category: 'HUMAN CONTROL' },
        { id: 'HC-04', name: 'Jasa Save Kontak', price: 'Rp7.000', category: 'HUMAN CONTROL' },
        { id: 'HC-05', name: 'Jasa Pembersihan', price: 'Rp20.000', category: 'HUMAN CONTROL' },
        { id: 'HC-06', name: 'Jasa Push BBC', price: 'Rp10.000', category: 'HUMAN CONTROL' },
        { id: 'HC-07', name: 'Jasa Admin & Account Assist', price: 'Rp16.000', category: 'HUMAN CONTROL' },
        { id: 'HC-08', name: 'Jasa Jawab Soal Interview (WWC)', price: 'Rp25.000', category: 'HUMAN CONTROL' },
        { id: 'HC-09', name: 'Jasa Confess', price: 'Rp10.000', category: 'HUMAN CONTROL' },
        { id: 'HC-10', name: 'Jasa Long Text', price: 'Rp20.000', category: 'HUMAN CONTROL' }
    ],
    'zone-access': [
        { id: 'FA-01', name: 'Streaming Platforms', price: 'RpVAR', category: 'FULL ACCESS' },
        { id: 'FA-02', name: 'Music Platforms', price: 'RpVAR', category: 'FULL ACCESS' },
        { id: 'FA-03', name: 'Educational Platforms', price: 'RpVAR', category: 'FULL ACCESS' },
        { id: 'FA-04', name: 'Social Media Platforms', price: 'RpVAR', category: 'FULL ACCESS' },
        { id: 'FA-05', name: 'Editing Platforms', price: 'RpVAR', category: 'FULL ACCESS' },
        { id: 'FA-06', name: 'Others', price: 'RpVAR', category: 'FULL ACCESS' }
    ],
    'zone-payment': [
        { id: 'TP-01', name: 'Top-Up E-Wallet & Bank', price: 'RpVAR', category: 'TOP UP & DIGITAL PAYMENT' },
        { id: 'TP-02', name: 'Top-Up Games', price: 'RpVAR', category: 'TOP UP & DIGITAL PAYMENT' },
        { id: 'TP-03', name: 'Top-Up Pulsa', price: 'RpVAR', category: 'TOP UP & DIGITAL PAYMENT' },
        { id: 'TP-04', name: 'Top-Up Paket Data', price: 'RpVAR', category: 'TOP UP & DIGITAL PAYMENT' },
        { id: 'TP-05', name: 'Utilities Needs', price: 'RpVAR', category: 'TOP UP & DIGITAL PAYMENT' },
        { id: 'TP-06', name: 'Social Media Needs', price: 'RpVAR', category: 'TOP UP & DIGITAL PAYMENT' }
    ],
    'zone-build': [
        { id: 'WB-01', name: 'Jasa Website', price: 'RpVAR', category: 'BUILD ZONE' }
    ],
    'zone-vnum': [
        { id: 'VN-01', name: 'Virtual Number & Verification', price: 'RpVAR', category: 'ACCESS LANE' }
    ],
    'zone-academic': [
        { id: 'AC-01', name: 'Academic Services', price: 'RpVAR', category: 'SUPPORT ZONE' }
    ]
};

    // --- MODAL ELEMENTS ---
    const modal = document.getElementById('item-modal');
    const modalClose = document.getElementById('modal-close');
    const modalItemId = document.getElementById('modal-item-id');
    const modalItemTitle = document.getElementById('modal-item-title');
    const modalItemPrice = document.getElementById('modal-item-price');
    const modalCategory = document.getElementById('modal-category');
    const orderCodeInput = document.getElementById('order-code');
    const copyCodeBtn = document.getElementById('copy-code-btn');
    const copyFeedback = document.getElementById('copy-feedback');

    let currentZone = 'zone-human';

    // --- MODAL FUNCTIONS ---
    // di openModal()
    function setTextareaAutoresize(el) {
    el.style.height = 'auto';
    el.style.height = (el.scrollHeight) + 'px';
}

// Pemakaian di openModal
orderCodeInput.value = '[ORDER]\nNama:\nUsername:\nPesanan: ...'; // dsb
setTextareaAutoresize(orderCodeInput);
function openModal(item) {
    modalItemId.textContent = `// ${item.id}`;
    modalItemTitle.textContent = item.name;
    modalItemPrice.innerHTML = `
        <button class="action-btn secondary" onclick="navigator.clipboard.writeText(document.getElementById('order-code').value)">Copy Format Pemesanan</button>
        <span class="harga-label">${item.price}</span>
    `;
    // Format default pemesanan
    orderCodeInput.value =
        `[ORDER]\nNama:\nUsername:\nPesanan: ${item.name}\nJumlah/Harga: ${item.price}\nCatatan:\nTerima kasih!`;
    setTextareaAutoresize(orderCodeInput);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        copyFeedback.classList.remove('show');
    }
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    copyCodeBtn.addEventListener('click', () => {
        orderCodeInput.select();
        navigator.clipboard.writeText(orderCodeInput.value).then(() => {
            copyFeedback.classList.add('show');
            setTimeout(() => {
                copyFeedback.classList.remove('show');
            }, 2000);
        });
    });

    // --- TAB LOGIC With Stagger and Grid Magnet (TRANSPARAN, READY COPY)
const tabs = document.querySelectorAll('.tab-btn');
const gridEl = document.getElementById('inventory-grid');

// Bikin underline animasi UX modern
const tabUnderline = document.createElement('div');
tabUnderline.className = 'tab-underline';
document.querySelector('.tabs-control').appendChild(tabUnderline);

function updateTabUnderline() {
    const activeTab = document.querySelector('.tab-btn.active');
    if (!activeTab) return;
    const { left, width } = activeTab.getBoundingClientRect();
    const parentLeft = activeTab.parentNode.getBoundingClientRect().left;
    tabUnderline.style.left = (left - parentLeft) + 'px';
    tabUnderline.style.width = width + 'px';
}
setTimeout(updateTabUnderline, 20);
window.addEventListener('resize', updateTabUnderline);

function renderGrid(zoneKey) {
    currentZone = zoneKey;
    gridEl.style.opacity = '0';
    setTimeout(() => {
        gridEl.innerHTML = '';
        const items = inventoryData[zoneKey] || [];
        items.forEach((item, i) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'item-module magnet';
            itemEl.innerHTML = `
                <div class="module-header">
                    <span class="item-id">// ${item.id}</span>
                    <div class="item-status">AVAIL</div>
                </div>
                <div class="item-title">${item.name}</div>
                <div class="item-price">${item.price}</div>
            `;
            itemEl.addEventListener('click', () => openModal(item));
            gridEl.appendChild(itemEl);

            setTimeout(() => itemEl.classList.add('visible'), 70 * i + 100);
        });
        gridEl.style.opacity = '1';
    }, 210);
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderGrid(tab.getAttribute('data-target'));
        setTimeout(updateTabUnderline,90);
        tab.classList.add('tab-press');
        setTimeout(() => tab.classList.remove('tab-press'), 210);
    });
});
setTimeout(updateTabUnderline, 150);
renderGrid('zone-human');

    // --- Cards magnetic hover UX polish
 gridEl.addEventListener('mousemove', function(e){
    if(window.innerWidth<780) return;
    const cards = Array.from(gridEl.querySelectorAll('.item-module.magnet'));
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width/2);
        const dy = e.clientY - (rect.top + rect.height/2);
        if(Math.abs(dx)<rect.width/2+80 && Math.abs(dy)<rect.height/2+80){
            card.style.transform = `translate(${dx*0.08}px,${dy*0.07}px) scale(1.03)`;
        } else {
            card.style.transform = '';
        }
    });
});
gridEl.addEventListener('mouseleave', function(){
    Array.from(gridEl.querySelectorAll('.item-module.magnet')).forEach(c => c.style.transform = '');
});

    // --- FAQ Accordion (tidak diubah)
    const faqBulletins = document.querySelectorAll('.faq-bulletin');
    faqBulletins.forEach(bulletin => {
        const header = bulletin.querySelector('.bulletin-header');
        const content = bulletin.querySelector('.bulletin-content');
        if(content && !content.querySelector('.bulletin-content-inner')) {
            const child = [...content.childNodes];
            const wrap = document.createElement('div');
            wrap.className = 'bulletin-content-inner';
            child.forEach(n=>wrap.appendChild(n));
            content.appendChild(wrap);
        }
        header.addEventListener('click', () => {
            faqBulletins.forEach(other => {
                if (other !== bulletin && other.classList.contains('active')) {
                    other.classList.remove('active');
                    let oc = other.querySelector('.bulletin-content');
                    if(oc) oc.style.maxHeight = null;
                }
            });
            bulletin.classList.toggle('active');
            let bc = bulletin.querySelector('.bulletin-content');
            let bci = bulletin.querySelector('.bulletin-content-inner');
            if (bulletin.classList.contains('active')) {
                bc.style.maxHeight = bci.scrollHeight + 'px';
            } else {
                bc.style.maxHeight = null;
            }
        });
    });

    // --- Modal spring reset polish
    function doSpringModal() {
        const modalPanel = modal.querySelector('.carbon-modal');
        if (modalPanel) {
            modalPanel.style.animation = "none";
            setTimeout(()=>modalPanel.style.animation = "",10);
        }
        setTimeout(() => modalClose.focus(), 210);
    }
    const originalOpenModal = openModal;
    openModal = function(item) {
        originalOpenModal(item);
        doSpringModal();
    };

    // --- Touch swipe close on modal
    let startY = 0;
    if ('ontouchstart' in window) {
        const modalPanel = document.querySelector('.carbon-modal');
        if (modalPanel) {
            modalPanel.addEventListener('touchstart', e=>{
                startY = e.touches[0].clientY;
            });
            modalPanel.addEventListener('touchmove', e=>{
                if(!modal.classList.contains('active')) return;
                let dist = e.touches[0].clientY - startY;
                if(dist > 70) {
                    closeModal();
                }
            });
        }
    }
});