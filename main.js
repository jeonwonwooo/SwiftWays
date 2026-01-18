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
        // ... data as is ...
        'zone-human': [
            { id: 'H-01', name: 'Identity Shield Protocol', price: '$450.00', category: 'HUMAN CONTROL' },
            { id: 'H-02', name: 'Reputation Management', price: '$1,200.00', category: 'HUMAN CONTROL' },
            { id: 'H-03', name: 'Personal Security Detail', price: 'REQ. QUOTE', category: 'HUMAN CONTROL' },
            { id: 'H-04', name: 'Legacy Erasure', price: '$850.00', category: 'HUMAN CONTROL' }
        ],
        // ... dst ...
        'zone-access': [
            { id: 'A-01', name: 'Premium Dashboard Access', price: '$199.00/mo', category: 'FULL ACCESS' },
            { id: 'A-02', name: 'Analytics Suite Pro', price: '$350.00/mo', category: 'FULL ACCESS' },
            { id: 'A-03', name: 'API Key: Unlimited', price: '$2,500.00', category: 'FULL ACCESS' },
            { id: 'A-04', name: 'Market Intelligence Feed', price: '$120.00/mo', category: 'FULL ACCESS' },
            { id: 'A-05', name: 'Priority Network Route', price: '$75.00/mo', category: 'FULL ACCESS' }
        ],
        'zone-payment': [
            { id: 'P-01', name: 'Credits Top Up: 500', price: '$500.00', category: 'TOP UP & PAYMENT' },
            { id: 'P-02', name: 'Credits Top Up: 1000', price: '$1,000.00', category: 'TOP UP & PAYMENT' },
            { id: 'P-03', name: 'Credits Top Up: 5000', price: '$5,000.00', category: 'TOP UP & PAYMENT' },
            { id: 'P-04', name: 'Escrow Service Fee', price: '5%', category: 'TOP UP & PAYMENT' },
            { id: 'P-05', name: 'Anonymous Transfer', price: '$25.00', category: 'TOP UP & PAYMENT' }
        ],
        'zone-build': [
            { id: 'B-01', name: 'Custom Landing Page', price: 'FROM $1,500', category: 'BUILD ZONE' },
            { id: 'B-02', name: 'System Integration', price: '$250.00/hr', category: 'BUILD ZONE' },
            { id: 'B-03', name: 'Server Architecture', price: 'REQ. QUOTE', category: 'BUILD ZONE' },
            { id: 'B-04', name: 'Security Audit', price: '$3,000.00', category: 'BUILD ZONE' }
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
    function openModal(item) {
        modalItemId.textContent = `// ${item.id}`;
        modalItemTitle.textContent = item.name;
        modalItemPrice.textContent = item.price;
        modalCategory.textContent = item.category;
        const orderCode = `SWIFT-${item.id}-2024`;
        orderCodeInput.value = orderCode;
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