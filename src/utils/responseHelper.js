// responseHelper.js
module.exports = {
    // ✅ 2xx - Success Responses
    successResponse: (res, message, data = null, statusCode = 200) => {
        return res.status(statusCode).json({ statusCode, message, data });
    },

    createdResponse: (res, message, data = null) => {
        return res.status(201).json({ statusCode: 201, message, data });
    },

    acceptedResponse: (res, message, data = null) => {
        return res.status(202).json({ statusCode: 202, message, data });
    },

    noContentResponse: (res) => {
        return res.status(204).send(); // Không có nội dung (ví dụ: xoá thành công)
    },

    // 🔶 3xx - Redirection (ít dùng cho API, vẫn để nếu cần)
    notModifiedResponse: (res, message = "Not Modified") => {
        return res.status(304).json({ statusCode: 304, message, data: null });
    },

    // 🔴 4xx - Client Errors
    badRequestResponse: (res, message) => {
        return res.status(400).json({ statusCode: 400, message, data: null });
    },

    unauthorizedResponse: (res, message) => {
        return res.status(401).json({ statusCode: 401, message, data: null });
    },

    forbiddenResponse: (res, message) => {
        return res.status(403).json({ statusCode: 403, message, data: null });
    },

    notFoundResponse: (res, message) => {
        return res.status(404).json({ statusCode: 404, message, data: null });
    },

    methodNotAllowedResponse: (res, message = "Phương thức không được hỗ trợ") => {
        return res.status(405).json({ statusCode: 405, message, data: null });
    },

    conflictResponse: (res, message) => {
        return res.status(409).json({ statusCode: 409, message, data: null });
    },

    unprocessableResponse: (res, message) => {
        return res.status(422).json({ statusCode: 422, message, data: null });
    },

    // 🔥 5xx - Server Errors
    serverErrorResponse: (res, message) => {
        return res.status(500).json({ statusCode: 500, message, data: null });
    },

    notImplementedResponse: (res, message = "Chưa hỗ trợ tính năng này") => {
        return res.status(501).json({ statusCode: 501, message, data: null });
    },

    badGatewayResponse: (res, message = "Lỗi gateway") => {
        return res.status(502).json({ statusCode: 502, message, data: null });
    },

    serviceUnavailableResponse: (res, message = "Dịch vụ tạm thời không sẵn sàng") => {
        return res.status(503).json({ statusCode: 503, message, data: null });
    }
};
