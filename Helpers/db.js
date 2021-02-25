import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Places.db');

export const init = ()=>{
    const promise = new Promise((resolve,reject)=>{
       db.transaction((tx)=>{
         tx.executeSql('CREATE TABLE IF NOT EXISTS Places (id INTEGER PRIMARY KEY NOT NULL,title TEXT NOT NULL,imageUri TEXT NOT NULL,address TEXT NOT NULL,lat REAL NOT NULL,lng REAL NOT NULL);',[],
         ()=>{
            resolve();
         },
         (_,err)=>{
            reject(err);
         })
       })
    })
    return promise;
}
export const insertPlace = (title,imageUri,address,lat,lng)=>{
    const promise = new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
          tx.executeSql('INSERT INTO Places (title,imageUri,address,lat,lng) VALUES (?,?,?,?,?)'
          ,[title,imageUri,address,lat,lng],
          (_,result)=>{
             resolve(result);
          },
          (_,err)=>{
             reject(err);
          })
        })
     })
     return promise;
}
export const fetchPlaces = ()=>{
    const promise = new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
          tx.executeSql('SELECT * FROM Places'
          ,[],
          (_,result)=>{
             resolve(result);
          },
          (_,err)=>{
             reject(err);
          })
        })
     })
     return promise;
}
export const deletePlace = (id)=>{
   const numId = parseInt(id);
   console.log(numId);
   const promise = new Promise((resolve,reject)=>{
      db.transaction((tx)=>{
        tx.executeSql(`DELETE FROM Places WHERE ID=${numId}`
        ,[],
        (_,result)=>{
           resolve(result);
        },
        (_,err)=>{
           reject(err);
        })
      })
   })
   return promise;
}