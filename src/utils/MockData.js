import { listPole } from "@/api/base/pole";
import { treeselect } from "@/api/system/dept";
import { listLampComponent }from "@/api/lamp/lampComponent";
import {listLampGroupTree} from "@/api/lamp/lampGroup";
import { listEvent, getEvent } from "@/api/yw/event";
import {
  listWeatherComponent,

} from "@/api/weather/weatherComponent";
export function MockPoleListData() {
  let MockData = [];
  listPole().then(response => {
    response.rows.map((item,index) => {

       index++;
      (item.address = "谷城县谷水路"),
        (item.name = "智慧灯杆" + index + "号"),
        (item.createBy = "智慧管理人员"),
        (item.deptName = "谷城县");
    });
    MockData.push(...response.rows);
  });
  return MockData;
}
export function MockGroupListData(){
  let MockData = [];
  listLampGroupTree().then(response => {
     MockData.push(...response.data) 
  });
  return MockData
}
export function MockGroupRoadListData() {
  let MockData = [];
  treeselect().then(response => {
    response.data[0].label = "谷城县";
    response.data[0].children = [
      {
        children: [],
        id: 101,
        label: "谷水路",
        pID: 100
      }
    ];
    MockData.push(response.data[0]);
  });
  return MockData
}

export function MockLightListData(queryParams){
    let MockData = []
    listLampComponent(queryParams).then((response) => {
        response.rows.map((item,index)=>{
            index++
            item.poleName="谷城灯杆" + index +"号",
            item.deptName="谷城县",
            item.name="谷城灯光"+ index +"号",
            item.pole.address="谷城县谷水路"
        })
        MockData.push(...response.rows)
        console.log(MockData);
      });
      return MockData
}


export function MocklistWeatherComponent(queryParams){
  let MockData = []
  listWeatherComponent(queryParams).then((response) => {
    response.rows.map((item,index)=>{
      index++
      item.name="谷城气象" + index +"号",
      item.dept.deptName="谷城县",
      item.pole.deptName="谷城县",
      item.pole.name="谷城灯杆" + index +"号"
    })
    MockData.push(...response.rows)
  });
  return MockData
}