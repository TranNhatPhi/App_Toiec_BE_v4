Bạn đã thiết kế CSDL (database) cho hệ thống quản lý rửa xe (CRM Wash) khá hoàn chỉnh. Dưới đây là giải thích từng bảng và các mối quan hệ chính, kèm gợi ý sử dụng:

1. roles
Mục đích: Phân loại vai trò tài khoản nội bộ hệ thống (Admin, User, Moderator...).

Quan hệ: 1-n với users (mỗi user thuộc 1 role, 1 role có nhiều user).

2. users
Mục đích: Quản lý tài khoản đăng nhập của hệ thống (dành cho nhân viên, quản lý... KHÔNG phải khách hàng!).

Trường: Họ tên, email, mật khẩu, số điện thoại, role_id (liên kết với bảng roles).

Quan hệ: Có thể được dùng để tracking ai tạo/sửa booking, transaction v.v.

3. memberships
Mục đích: Quản lý các gói thành viên/ưu đãi (membership package), ví dụ: Gói vàng, bạc, giảm giá, v.v.

Trường: Tên gói, mô tả, giá, thời hạn, quyền lợi, trạng thái.

Quan hệ: 1-n với customers (1 membership có nhiều khách), 1-n với transactions.

4. customers
Mục đích: Quản lý thông tin khách hàng sử dụng dịch vụ (KH không phải nhân viên, chỉ lưu liên hệ, email...).

Trường: Họ tên, email, số điện thoại, tags, ngày đăng ký, membership_id (liên kết membership).

Quan hệ: 1-n với vehicles, 1-n với bookings, 1-n với transactions, 1-n với messages.

5. vehicles
Mục đích: Lưu thông tin từng xe của khách hàng.

Trường: Biển số, hãng, model, năm, màu, ghi chú, customer_id.

Quan hệ: 1-n với bookings (1 xe có nhiều lượt rửa), 1-n với customers.

6. services
Mục đích: Định nghĩa các dịch vụ rửa xe, phụ kiện, combo...

Trường: Tên dịch vụ, mô tả, giá, thời lượng, loại dịch vụ.

Quan hệ: n-n với booking qua bảng booking_services.

7. bookings
Mục đích: Quản lý từng đơn đặt lịch rửa xe của khách.

Trường: customer_id, vehicle_id, ngày, trạng thái, tổng tiền, ghi chú, có thể có created_by, updated_by để tracking nhân viên thao tác.

Quan hệ: n-1 với customers, n-1 với vehicles, n-n với services qua booking_services, 1-1 hoặc 1-n với transactions.

8. booking_services
Mục đích: Bảng trung gian nhiều-nhiều (n-n) giữa booking và service (1 booking chọn nhiều dịch vụ, 1 dịch vụ xuất hiện trong nhiều booking).

Trường: booking_id, service_id, thời gian tạo, cập nhật.

9. transactions
Mục đích: Quản lý giao dịch thanh toán (payment), mỗi lần khách trả tiền cho booking hay membership.

Trường: customer_id, booking_id, membership_id, số tiền, phương thức, trạng thái, thời gian.

Quan hệ: n-1 với customers, n-1 với bookings, n-1 với memberships.

10. messages
Mục đích: Lưu lại các tin nhắn gửi tới khách (ví dụ báo xe đã rửa xong, nhắc lịch...).

Trường: customer_id, nội dung, thời gian, trạng thái, có phải tin đến không (is_incoming).

Quan hệ: n-1 với customers.

Tổng thể quan hệ
customers → vehicles, bookings, transactions, messages (1-n)

vehicles → bookings (1-n)

bookings → booking_services (1-n)

services → booking_services (1-n)

bookings → transactions (1-n hoặc 1-1)

customers → memberships (1-n)

users → roles (1-n)

(nếu muốn, bookings có thể thêm trường created_by, updated_by FK đến users để biết ai thao tác, đã setup hợp lý trong mô hình mới)

Sử dụng thực tế
Khi khách đến: Chọn/mở customer, chọn/đăng ký vehicle, tạo booking → chọn service → tạo transaction khi thanh toán.

Quản lý các dịch vụ qua services, tạo ưu đãi qua memberships, chăm sóc khách bằng messages.

Nội bộ nhân viên đăng nhập bằng users và được phân quyền qua roles.


{
  "statusCode": 200,
  "message": "Cập nhật xe thành công!",
  "data": {
    "id": 1,
    "customer_id": 1,
    "make": "Toyota",
    "model": "Camry",
    "year": 2022,
    "color": "Black",
    "license_plate": "30F-123.45",
    "notes": "Xe khách hàng thân thiết",
    "createdAt": "2017-03-27T13:42:16.000Z",
    "updatedAt": "2025-06-17T17:37:37.054Z"
  }
}
