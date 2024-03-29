/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    // this.name = null;
    this.password = null;
    this.username = null;
    this.status = null;
    this.creationDate = null;
    this.birthdate = null;
    Object.assign(this, data);
  }
}

export default User;
