const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

const TYPE_IMAGE = {
  MAIN: "main",
  SUB: "sub",
};
interface STATUS_ORDER {
  INITIAL: string;
  WAIT_CONFIRMATION: string;
  WAIT_PICK_UP_GOODS: string;
  IN_TRANSIT: string;
  DELIVERED: string;
  DELIVERY_FAILED: string;
  RETURNING: string;
  RETURNED: string;
  CANCELLED: string;
  COMPLETED: string;
  PAY_SUCCESS: string;
}

interface STATUS_PAY {
  PAY_SUCCESS: string;
  PAY_NOT_YET: string;
}
const STATUS_ORDER: STATUS_ORDER = {
  INITIAL: "khoi-tao",
  WAIT_CONFIRMATION: "cho-xac-nhan",
  WAIT_PICK_UP_GOODS: "cho-lay-hang",
  IN_TRANSIT: "dang-giao-hang",
  DELIVERED: "da-giao-hang",
  DELIVERY_FAILED: "giao-hang-that-bai",
  RETURNING: "dang-hoan-tra",
  RETURNED: "da-hoan-tra",
  CANCELLED: "da-huy",
  COMPLETED: "hoan-thanh",
  PAY_SUCCESS: "thanh-toan-thanh-cong",
};

const STATUS_PAY: STATUS_PAY = {
  PAY_SUCCESS: 'thanh-toan-thanh-cong',
  PAY_NOT_YET: 'chua-thanh-toan'
};

export { STATUS, TYPE_IMAGE, STATUS_ORDER, STATUS_PAY };
