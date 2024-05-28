function isValidObjectId(str) {
    // Kiểm tra chuỗi có đúng định dạng ObjectID không
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(str);
}

function convertToObjectId(str) {
    if (isValidObjectId(str)) {
        // Chuyển đổi chuỗi thành ObjectID bằng cách chia thành các phần 12 và 12 ký tự, sau đó chuyển đổi từ hex sang số
        const objectId = {
            _id: new Uint8Array(str.match(/[\da-f]{2}/gi).map(function (h) {
                return parseInt(h, 16);
            }))
        };
        return objectId;
    } else {
        throw new Error('Invalid ObjectID format');
    }
}


module.exports = {
    convertToObjectId
}