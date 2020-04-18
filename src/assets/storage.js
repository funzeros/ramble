const storage = {
  //设置
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  //获得
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  //移除
  remove(key) {
    localStorage.removeItem(key);
  },
};
export default storage;
