import React from 'react'
import { useEffect, useState } from 'react';
import SelectList from 'react-native-dropdown-select-list'

const DropDown = (props) => {

  const [selected, setSelected] = useState("");
  const [materias,setMaterias] = useState([]);
  
  useEffect(() =>{
    fetch("http://localhost:3000/materias", {
    method : 'GET',
    })
    .then((response) => 
        // Store Values in Temporary Array
        
          response.json()
    ).then((data)=> {
      console.log(data)
      let newArray = data.map((item) => {
        return {key: item.id, value: item.nombre}
      })
      console.log(newArray)
      //Set Data Variable
      setMaterias(newArray)
    })
    .catch((e) => {
        console.log(e)
      }) 
},[]);

  return(
    <SelectList setSelected={setSelected} data={materias} onSelect={() => {
      
      alert(selected)
      fetch("http://localhost:3000/teachers?idMateria="+selected, {
        method : 'GET',
        //Authorization: "Bearer " + dsffdsfddsf
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          props.update(data)
    
        });

      }} />
  )
}

/*const styles = StyleSheet.create({
  dropdown: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 10,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
})*/

export default DropDown;