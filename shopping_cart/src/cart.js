// JSON 데이터 예시 (chk[]의 값들을 모두 수집한 결과)
var items = [
    {
        "rnum": "25",
        "rc_estimate_code": "2024072100043",
        "status": "3",
        "estimate_quantity": "1",
        "estimate_amt": "5000",
        "delivery_fee": "0",
        "estimate_price": "5000",
        "estimate_validate_dt": "20240804",
        "delivery_fee_kind": "1",
        "delivery_group_yn": "Y",
        "remain_qnt": "1980",
        "goods_name": "색연필에듀테크",
        "size": "188*12612색1개",
        "credit_str": "각",
        "model": "",
        "goods_status": "3",
        "edu_sync_yn": "N",
        "re_estimate_code": "202209134900136",
        "estimate_doc_print": "색연필에듀테크|2008120500037|2024072100043|5000|5000|",
        "company_code_b": "2008120500037",
        "company_name_b": "테스트공급업체11004",
        "nego_req_f_data": "2024072100043####2008120500037#",
        "rc_estimate_code_org": "2024071124445",
        "gift_card": "",
        "delivery_fee_limit": "0",
        "enterprises_classification_code": "01:::::03:::::05:::::11:::::143:::::166:::::168:::::90",
        "uid3": "4810209901",
        "pd_cert_file": "",
        "smpp_pd_cert": "",
        "sale_type": "1",
        "keyword2": "",
        "delivery_jeju_fee": "0"
    }
    // 추가 데이터...
];

// 총액 계산 함수
function calculateTotalAmount() {
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
function changeQuantity() {
    items.forEach(function(item) {
        let maxQuantity = parseInt(item.remain_qnt);
        let newQuantity = prompt(`Enter new quantity for ${item.goods_name} (max ${maxQuantity}):`, item.estimate_quantity);
        
        if (newQuantity > 0 && newQuantity <= maxQuantity) {
            item.estimate_quantity = newQuantity;
        } else {
            alert(`Invalid quantity for ${item.goods_name}.`);
        }
    });
}

// 조건부 배송비 계산 함수
function calculateConditionalDeliveryFee() {
    let freeShippingThreshold = 300000;
    let totalAmount = calculateTotalAmount();

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
function sortByAmount() {
    items.sort(function(a, b) {
        return (parseInt(b.estimate_price) * parseInt(b.estimate_quantity)) - (parseInt(a.estimate_price) * parseInt(a.estimate_quantity));
    });

    console.log("Items sorted by amount:", items);
}

// 품명 기준 정렬 함수
function sortByGoodsName() {
    items.sort(function(a, b) {
        return a.goods_name.localeCompare(b.goods_name);
    });

    console.log("Items sorted by goods name:", items);
}

// 재고 체크 함수
function checkStock() {
    items.forEach(function(item) {
        if (parseInt(item.remain_qnt) <= 0) {
            console.log(`Out of stock: ${item.goods_name}`);
        } else {
            console.log(`In stock: ${item.goods_name}, Quantity: ${item.remain_qnt}`);
        }
    });
}

// 중소기업자 간 경쟁제품 물품 구매 체크 함수
function checkSMEProductPurchase() {
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
function compareEstimates() {
    let selectedItems = items.slice(0, 5); // 최대 5개 선택

    if (selectedItems.length < 2) {
        console.log("Not enough items to compare.");
        return;
    }

    console.log("Comparing the following items:", selectedItems);
    // 비교 로직 추가 필요
}

// 수의시담 함수
function negotiateDirectly() {
    items.forEach(function(item) {
        let negotiationPossible = confirm(`Would you like to negotiate for ${item.goods_name}?`);
        if (negotiationPossible) {
            console.log(`Negotiation started for ${item.goods_name}`);
            // 추가 협상 로직
        }
    });
}

// 선택 삭제 함수
function deleteSelectedItems() {
    items = items.filter(function(item) {
        let isSelected = confirm(`Would you like to delete ${item.goods_name}?`);
        return !isSelected;
    });

    console.log("Remaining items after deletion:", items);
}
