// Import stylesheets
import "./style.css";

// Import Vue
import Vue from "vue";
import VueGoodTablePlugin from "vue-good-table";
import Papa from "papaparse";

// import the styles
import 'vue-good-table/dist/vue-good-table.css';

Vue.use(VueGoodTablePlugin);

// Our data object
var row_data = [
  /*
  { id: 1, name: "John", age: 20, createdAt: "2011-10-31", score: 0.03343 },
  { id: 2, name: "Jane", age: 24, createdAt: "2011-10-31", score: 0.03343 },
  { id: 3, name: "Susan", age: 16, createdAt: "2011-10-30", score: 0.03343 },
  { id: 4, name: "Chris", age: 55, createdAt: "2011-10-11", score: 0.03343 },
  { id: 5, name: "Dan", age: 40, createdAt: "2011-10-21", score: 0.03343 },
  { id: 6, name: "John", age: 20, createdAt: "2011-10-31", score: 0.03343 }*/
];

var columns_data = [
  /*
  { label: "Name", field: "name" },
  { label: "Age", field: "age", type: "number" },
  { label: "Created On", field: "createdAt", type: "date", dateInputFormat: "yyyy-MM-dd", dateOutputFormat: "MMM Do yy"
  },
  { label: "Percent", field: "score",type: "percentage" }*/
];

function fill_columns(item, index) {
  var column_item = { label: item, field: "f_"+index };
  //console.log(column_item);
  columns_data.push(column_item);
}

function fill_rows(item, index) {
  // TODO
  //row_data.push(  );
  //vm.columns = columns_data;
  //console.log(item);

  var index = 0;

  var row_item = {};

  for(var prop in item) {    
    //console.log("Index: " + "f_"+index + " -> " + prop );
    row_item["f_"+index] = item[prop];
    index++;
  }

  //console.log("Row item",row_item);
  row_data.push(row_item);  
}

var vm = new Vue({
  el: "#app",
  data: {
    columns: columns_data,
    rows: row_data
  },
  methods: {
    parseFile(evt) {
      this.clearTable();
      console.log(evt.target.files);
      var data = null;
      var file = evt.target.files[0];
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(event) {
        var csvData = event.target.result;

        var data = Papa.parse(csvData, { header: true });
        /*
        console.log(data);
        console.log(data.meta.fields);
        console.log(data.data);
        */
        data.meta.fields.forEach(fill_columns);
        vm.columns = columns_data;
        data.data.forEach(fill_rows);
        vm.rows = row_data;
      };
      reader.onerror = function() {
        alert("Unable to read " + file.fileName);
      };
    },
    clearTable() {     
      vm.rows = [];
      vm.columns = [];
    }
  }
});
