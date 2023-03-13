class actionCommon {
  constructor() {}
  checkPermission(roles = [], permitNeedCheck) {
    let checkPermit = false;
    roles.forEach((item) => {
      const { permissions = [] } = item || {};
      permissions.forEach((element) => {
        if (element.name === permitNeedCheck) {
          checkPermit = true;
        }
      });
    });
    return checkPermit;
  }
}
const action = new actionCommon();
export default action;
