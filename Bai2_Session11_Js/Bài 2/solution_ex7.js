const smartHomeDevices = [];
let nextDeviceId = 1;

const validateDevice = (device) => {
  if (!device.name || typeof device.name !== 'string') return false;
  if (!device.room || typeof device.room !== 'string') return false;
  if (device.powerWatts === undefined || device.powerWatts <= 0) return false;
  return true;
};

const createDevice = (list, newDev) => {
  if (!validateDevice(newDev)) {
    console.log("Lỗi: Dữ liệu thiết bị không hợp lệ.");
    return false;
  }
  const id = `DEV_${String(nextDeviceId).padStart(3, '0')}`;
  nextDeviceId++;
  
  const deviceToAdd = {
    id: id,
    name: newDev.name,
    room: newDev.room,
    powerWatts: newDev.powerWatts,
    isActive: newDev.isActive !== undefined ? newDev.isActive : false
  };
  
  list.push(deviceToAdd);
  return deviceToAdd;
};

const readDevicesByRoom = (list, roomName) => {
  const result = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].room === roomName) {
      result.push(list[i]);
    }
  }
  return result;
};

const updateDevice = (list, id, updateData) => {
  let targetIndex = -1;
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      targetIndex = i;
      break;
    }
  }
  
  if (targetIndex === -1) {
    console.log(`Lỗi: Không tìm thấy thiết bị có ID ${id}`);
    return false;
  }
  
  const targetDevice = list[targetIndex];
  
  if (updateData.name !== undefined) {
    targetDevice.name = updateData.name;
  }
  if (updateData.room !== undefined) {
    targetDevice.room = updateData.room;
  }
  if (updateData.powerWatts !== undefined) {
    targetDevice.powerWatts = updateData.powerWatts;
  }
  if (updateData.isActive !== undefined) {
    targetDevice.isActive = updateData.isActive;
  }
  
  return true;
};

const deleteDevice = (list, id) => {
  let targetIndex = -1;
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      targetIndex = i;
      break;
    }
  }
  
  if (targetIndex === -1) {
    console.log(`Lỗi: Không tìm thấy thiết bị có ID ${id}`);
    return false;
  }
  
  list.splice(targetIndex, 1);
  return true;
};

console.log("--- KHỞI TẠO VÀ THÊM THIẾT BỊ ---");
createDevice(smartHomeDevices, { name: "Điều hòa", room: "Phòng Khách", powerWatts: 1500, isActive: false });
createDevice(smartHomeDevices, { name: "Tivi OLED", room: "Phòng Khách", powerWatts: 150, isActive: true });
createDevice(smartHomeDevices, { name: "Đèn LED", room: "Phòng Ngủ", powerWatts: 20 });
createDevice(smartHomeDevices, { name: "Thiết bị lỗi", room: "", powerWatts: 0 });

console.table(smartHomeDevices);

console.log("--- LỌC THIẾT BỊ THEO PHÒNG KHÁCH ---");
const livingRoomDevices = readDevicesByRoom(smartHomeDevices, "Phòng Khách");
console.table(livingRoomDevices);

console.log("--- CẬP NHẬT THIẾT BỊ ---");
updateDevice(smartHomeDevices, "DEV_001", { isActive: true, powerWatts: 2000 });
updateDevice(smartHomeDevices, "DEV_003", { powerWatts: 0, isActive: false });
updateDevice(smartHomeDevices, "DEV_999", { isActive: true });
console.table(smartHomeDevices);

console.log("--- XÓA THIẾT BỊ ---");
deleteDevice(smartHomeDevices, "DEV_002");
console.table(smartHomeDevices);
