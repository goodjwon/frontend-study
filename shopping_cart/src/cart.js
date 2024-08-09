const fs = require('fs').promises;
const path = '../asset/cart.json'; // JSON 파일 경로

// JSON 데이터를 로드하는 함수
async function loadCartData() {
    try {
        const data = await fs.readFile(path, 'utf8');
        const items = JSON.parse(data);
        return items;
    } catch (error) {
        console.error('Error loading cart data:', error);
        return [];
    }
}

// 총액 계산 함수
function calculateTotalAmount(items) {
    let totalAmount = 0;

    items.forEach(function(item) {
        let quantity = parseInt(item.estimate_quantity);
        let unitPrice = parseInt(item.estimate_price);
        let deliveryFee = parseInt(item.delivery_fee);
        totalAmount += (quantity * unitPrice) + deliveryFee;
    });

    console.log("Total Amount:", totalAmount);
    return totalAmount;
}

// 수량 변경 함수
function changeQuantity(items) {
    items.forEach(function(item) {
        let maxQuantity = parseInt(item.remain_qnt);
        let newQuantity = Math.min(Math.max(1, parseInt(item.estimate_quantity)), maxQuantity);
        item.estimate_quantity = newQuantity;
        console.log(`Quantity updated for ${item.goods_name}: ${newQuantity}`);
    });
}

// 조건부 배송비 계산 함수
function calculateConditionalDeliveryFee(items) {
    let freeShippingThreshold = 300000;
    let totalAmount = calculateTotalAmount(items);

    if (totalAmount >= freeShippingThreshold) {
        items.forEach(function(item) {
            item.delivery_fee = 0;
        });
        console.log("Free shipping applied.");
    } else {
        console.log("Shipping fee applied as per item.");
    }
}

// 금액 기준 정렬 함수
function sortByAmount(items) {
    items.sort(function(a, b) {
        return (parseInt(b.estimate_price) * parseInt(b.estimate_quantity)) - (parseInt(a.estimate_price) * parseInt(a.estimate_quantity));
    });

    console.log("Items sorted by amount:", items);
}

// 품명 기준 정렬 함수
function sortByGoodsName(items) {
    items.sort(function(a, b) {
        return a.goods_name.localeCompare(b.goods_name);
    });

    console.log("Items sorted by goods name:", items);
}

// 재고 체크 함수
function checkStock(items) {
    items.forEach(function(item) {
        if (parseInt(item.remain_qnt) <= 0) {
            console.log(`Out of stock: ${item.goods_name}`);
        } else {
            console.log(`In stock: ${item.goods_name}, Quantity: ${item.remain_qnt}`);
        }
    });
}

// 중소기업자 간 경쟁제품 물품 구매 체크 함수
function checkSMEProductPurchase(items) {
    items.forEach(function(item) {
        let isSMEProduct = item.enterprises_classification_code.includes("01");
        if (isSMEProduct) {
            console.log(`SME product: ${item.goods_name}`);
        } else {
            console.log(`Not an SME product: ${item.goods_name}`);
        }
    });
}

// 견적 비교 함수
function compareEstimates(items) {
    let selectedItems = items.slice(0, 5); // 최대 5개 선택

    if (selectedItems.length < 2) {
        console.log("Not enough items to compare.");
        return;
    }

    console.log("Comparing the following items:", selectedItems);
    // 비교 로직 추가 필요
}

// 수의시담 함수
function negotiateDirectly(items) {
    items.forEach(function(item) {
        let negotiationPossible = true; // 수의시담 여부 판단 로직 필요
        if (negotiationPossible) {
            console.log(`Negotiation started for ${item.goods_name}`);
            // 추가 협상 로직
        }
    });
}

// 선택 삭제 함수
function deleteSelectedItems(items) {
    items = items.filter(function(item) {
        let isSelected = false; // 삭제 여부 판단 로직 필요
        return !isSelected;
    });

    console.log("Remaining items after deletion:", items);
}

// 메인 함수 - 모든 작업을 실행
async function main() {
    const items = await loadCartData();

    calculateTotalAmount(items);
    changeQuantity(items);
    calculateConditionalDeliveryFee(items);
    sortByAmount(items);
    sortByGoodsName(items);
    checkStock(items);
    checkSMEProductPurchase(items);
    compareEstimates(items);
    negotiateDirectly(items);
    deleteSelectedItems(items);
}

main();
