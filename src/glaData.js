
export default {
    parent: '',
    Level_ID: '',
    tableData:'',
    setname (newName) {
      this.parent = newName
      // console.log('根ID已经改变')
    },
    setname_2 (newName) {
        this.Level_ID = newName
        // console.log('根ID已经改变')
    },
    tableData(newName){
        this.tableData = newName
    }



  }
