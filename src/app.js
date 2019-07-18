export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
//git clone -b develop https://gitee.com/Elvmx/qf-back-fore.git
