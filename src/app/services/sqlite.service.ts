import { Injectable } from '@angular/core';
// import initSqlJs from 'sql.js';
declare var initSqlJs: any;
@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  db: any;

  constructor() { 
    this.createSQL()
  }

  async createSQL() {
    const SQL = await initSqlJs({
      locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.0/${file}`,
    });
    this.db = new SQL.Database();
    console.log('Database initialized');
    await this.createTable()
  }

  async createTable() {
    await this.createLoginTable();
    await this.createCommonTable();
    await this.createMasterVersionTable()
  }

  createLoginTable() {
    const query = 'CREATE TABLE IF NOT EXISTS LOGIN_DETAILS (seq_id INTEGER PRIMARY KEY AUTOINCREMENT,user_name TEXT,password TEXT,orgscode TEXT,status TEXT,statusCode TEXT,ro_name TEXT,userID TEXT,ILcremUser TEXT,UserGroups TEXT,supervoiser TEXT,supvId TEXT,supvName TEXT,Timestamp TEXT,orgLocationList TEXT,lastLoginDate TEXT)';
    this.db.run(query);
    console.log('login Table created');
  }

  createCommonTable() {
    const query = 'CREATE TABLE IF NOT EXISTS COMMON_MASTER_DATA (MAS_ID INTEGER PRIMARY KEY AUTOINCREMENT,CODE TEXT,NAME TEXT,TYPE TEXT)';
    this.db.run(query);
    console.log('common Table created');
  }

  createMasterVersionTable() {
    const query = 'CREATE TABLE IF NOT EXISTS MASTER_UPDATE_VERSION (versionid INTEGER PRIMARY KEY AUTOINCREMENT,version TEXT)';
    this.db.run(query);
    console.log('master version Table created');
  }

  async getLoginDetails(username) {
    const query = `SELECT * FROM LOGIN_DETAILS WHERE userID='${username}'`;
    console.log('getLoginDetails', query);
    console.log('getLoginDetails-username', query);
    // if(!this.db) {
    //   await this.createSQL()
    //   const users = await this.db.exec(query);
    //   return users;
    // } else {
      const users = this.db.exec(query);
      return users;
    // }
    
  }


  insertLoginMasterDetails(tableName, ...value) {
    const query = `INSERT INTO ${tableName} (user_name,password,orgscode,status,statusCode,ro_name,userID,ILcremUser,UserGroups,supervoiser,supvId,supvName,Timestamp,orgLocationList) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    this.db.run(query, [value[0],value[1],value[2],value[3],value[4],value[5],value[6],value[7],value[8],value[9],value[10] ? value[10]: "",value[11] ? value[11]: "",value[12],value[13]]);
    console.log('User inserted');
  }

  updateLoginDetails(loginDetails) {
    const query = `UPDATE LOGIN_DETAILS  SET user_name=?,password=?,orgscode=?,status=?,statusCode=?,ro_name=?,userID=?,ILcremUser=?,UserGroups=?,supervoiser=?,supvId=?,supvName=?,Timestamp=?,orgLocationList=? WHERE seq_id=?`
    this.db.run(query, [loginDetails.user_name,
      loginDetails.password,
      loginDetails.orgscode,
      loginDetails.status,
      loginDetails.statusCode,
      loginDetails.UserName,
      loginDetails.userID,
      loginDetails.ILcremUser,
      loginDetails.UserGroups,
      loginDetails.supervoiser,
      loginDetails.supvId,
      loginDetails.supvName,
      loginDetails.Timestamp,
      loginDetails.orgLocationList,
      loginDetails.seq_id])
    
  }

  updateLastLoginStatus(loginDetails) {
    const query = `UPDATE LOGIN_DETAILS  SET lastLoginDate=? WHERE seq_id=?`
    this.db.run(query, [loginDetails.lastLoginDate, loginDetails.seq_id])
  }

  getAllRecordsWithoutIds(tableName) {
    try {
      const query = `SELECT * FROM ${tableName}`;
      console.log('getAllRecordsWithoutIds', query);
      const users = this.db.exec(query);
      return users;
    } catch (error) {
      console.log("getAllRecordsWithoutIds", error)
      return error;
    }
  }

  deleteStaticMasters(tableName: string) {
    const query = `DELETE FROM '${tableName}'`
    this.db.run(query)
    return true;
  }

  insertAllMasterData(master, type){
    master.forEach(master => {
      const query = `INSERT INTO COMMON_MASTER_DATA (CODE,NAME,TYPE) VALUES (?,?,?)`;
      console.log("insertAllMasterData", query)
      this.db.run(query, [master.optionValue, master.optionDesc, type]);
      console.log('User inserted');
    });
    return true;
  }
  
  getMasterData() {
    try {
      const query = `SELECT * FROM COMMON_MASTER_DATA`;
      console.log('getMasterData', query);
      const allData = this.db.exec(query);
      return allData;
    } catch (error) {
      console.log("getAllRecordsWithoutIds", error)
      return error;
    }
  }

  getStaticDataById(idValue: string) {
    try {
      const query = `SELECT * FROM COMMON_MASTER_DATA WHERE TYPE='${idValue}'`;
      console.log('getLoginDetails', query);
      console.log('getLoginDetails-username', query);
      const users = this.db.exec(query);
      return users;
    } catch (error) {
      console.log("getAllRecordsWithoutIds", error)
      return error;
    }
  }

  // insertUser(name: string) {
  //   const query = 'INSERT INTO users (name) VALUES (?)';
  //   this.db.run(query, [name]);
  //   console.log('User inserted');
  // }

  // getUsers() {
  //   const query = 'SELECT * FROM users';
  //   const users = this.db.exec(query);
  //   console.log(users);
  // }

}
