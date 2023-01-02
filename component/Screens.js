import React , {useState, useEffect} from 'react';
import {Pressable, Alert, Modal, TextInput, TouchableOpacity, Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import TaskItem from './TaskItem';
import TaskInputField from './TaskInputField';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
export const HomeScreen = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
      if (task == null) return;
      setTasks([...tasks, task]);
      Keyboard.dismiss();
    }
  
    const deleteTask = (deleteIndex) => {
      setTasks(tasks.filter((value, index) => index != deleteIndex));
    }
    return(
        <View style={styles.container}>
    <Text style={styles.heading}>TODO LIST</Text>
      <ScrollView style={styles.scrollView}>
        {
        tasks.map((task, index) => {
          return (
            <View key={index} style={styles.taskContainer}>
              <TaskItem index={index + 1} task={task} deleteTask={() => deleteTask(index)}/>
            </View>
          );
        })
      }
      </ScrollView>
      <TaskInputField addTask={addTask}/>
        </View>
    );
}


export const StudentScreen  = () => {
  const [update, setUpdate] = useState(false)
  const [updateId, setUpdateID] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("")
  const [grade, setGrade] = useState("")
  const [student, setStudent] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/student/").then((respons)=>setStudent(respons.data)).catch((error)=>console.log(error))
  }, [])
 const fetchAfter = ()=>{
  axios.get("http://127.0.0.1:8000/student/").then((respons)=>setStudent(respons.data)).catch((error)=>console.log(error))
  }
  const deleteStudent = (id)=>{
    axios.delete("http://127.0.0.1:8000/student/delete/"+id+"/" ).then((respons)=>{
      fetchAfter();
    }).catch((error)=>console.log(error))
  }

  const addStudent = ()=>{
    const data = {
      name:name,
    }
    axios.post("http://127.0.0.1:8000/student/add/", data).then((respons)=>{
      fetchAfter();
    }).catch((error)=>console.log(error))
  }
  const updateStudent = (id, name)=>{
      setName(name);
      setUpdateID(id);
      setUpdate(true);
      setModalVisible(true)
  }
  const updateStudentData = ()=>{
    const data = {
      name:name,
    }
    axios.post("http://127.0.0.1:8000/student/update/"+updateId+"/", data ).then((respons)=>{
      setUpdate(false)
      fetchAfter();

    }).catch((error)=>console.log(error))
}
    return(
        <View style={styles.container}>
          <View style={styles.centeredView}>
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={styles.inputContainer}>
          <TextInput style={styles.inputField} value={name} onChangeText={text => setName(text)} placeholder={'Name'} placeholderTextColor={'#fff'}/>
          {/* <TextInput style={styles.inputField} value={grade} onChangeText={text => setGrade(text)} placeholder={'Grade'} placeholderTextColor={'#fff'}/> */}
          <TouchableOpacity onPress={() =>update?updateStudentData(): addStudent()}>
          <View style={styles.button}>
              <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
          </View>
          
        </TouchableOpacity>
        <TouchableOpacity  onPress={() =>setModalVisible(!modalVisible)}>
          <View style={styles.button}>
          <Text style={styles.text}>Cancel</Text>
          </View>
          
        </TouchableOpacity>
          </View>
                    </View>
        </View>
      </Modal>
      </View>
          <View style={styles.inputContainer}>
          <TextInput style={styles.inputField} value={name} onChangeText={text => setName(text)} placeholder={'Name'} placeholderTextColor={'#fff'}/>
          {/* <TextInput style={styles.inputField} value={grade} onChangeText={text => setGrade(text)} placeholder={'Grade'} placeholderTextColor={'#fff'}/> */}
          <TouchableOpacity onPress={() => addStudent()}>
          <View style={styles.button}>
              <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
          </View>
          
        </TouchableOpacity>
          </View>
           <View style={styles.listHeader}>
                <Text style={styles.text}>Name</Text>
                {/* <Text style={styles.text}>Grade</Text> */}
                <Text style={styles.text}>Action</Text>
            </View>
          {student.map((each)=>{
            return(
              <View style={styles.listHolder}>
                <Text style={styles.text}>{each.name}</Text>
                {/* <Text style={styles.text}>{each.grade}</Text> */}
                <TouchableOpacity onPress={()=>updateStudent(each.id, each.name)}>
                    <MaterialIcons style={styles.delete} name="edit" size={18} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>deleteStudent(each.id)}>
                    <MaterialIcons style={styles.delete} name="delete" size={18} color='#fff' />
                </TouchableOpacity>
              </View>
            )
          })}
           
        </View>
    );
}
export const TeacherScreen  = () => {
  const [name, setName] = useState("")
  const [grade, setGrade] = useState("")
  const [student, setStudent] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/teacher/").then((respons)=>setStudent(respons.data)).catch((error)=>console.log(error))
  }, [])
 const fetchAfter = ()=>{
  axios.get("http://127.0.0.1:8000/teacher/").then((respons)=>setStudent(respons.data)).catch((error)=>console.log(error))
  }
  const deleteStudent = (id)=>{
    axios.delete("http://127.0.0.1:8000/teacher/delete/"+id+"/" ).then((respons)=>{
      fetchAfter();
    }).catch((error)=>console.log(error))
  }

  const addStudent = ()=>{
    const data = {
      name:name,
    }
    axios.post("http://127.0.0.1:8000/teacher/add/", data).then((respons)=>{
      fetchAfter();
    }).catch((error)=>console.log(error))
  }
    return(
        <View style={styles.container}>
          <View style={styles.inputContainer}>
          <TextInput style={styles.inputField} value={name} onChangeText={text => setName(text)} placeholder={'Name'} placeholderTextColor={'#fff'}/>
          {/* <TextInput style={styles.inputField} value={grade} onChangeText={text => setGrade(text)} placeholder={'Grade'} placeholderTextColor={'#fff'}/> */}
          <TouchableOpacity onPress={() =>addStudent()}>
          <View style={styles.button}>
              <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
          </View>
          
        </TouchableOpacity>
          </View>
           <View style={styles.listHeader}>
                <Text style={styles.text}>Name</Text>
                {/* <Text style={styles.text}>Grade</Text> */}
                <Text style={styles.text}>Action</Text>
            </View>
          {student.map((each)=>{
            return(
              <View style={styles.listHolder}>
                <Text style={styles.text}>{each.name}</Text>
                {/* <Text style={styles.text}>{each.grade}</Text> */}
                
                <TouchableOpacity onPress={()=>deleteStudent(each.id)}>
                    <MaterialIcons style={styles.delete} name="delete" size={18} color='#fff' />
                </TouchableOpacity>
               
              </View>
            )
          })}
           
        </View>
    );
}
export const EmployeeScreen  = () => {
  const [name, setName] = useState("")
  const [grade, setGrade] = useState("")
  const [student, setStudent] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/employee/").then((respons)=>setStudent(respons.data)).catch((error)=>console.log(error))
  }, [])
 const fetchAfter = ()=>{
  axios.get("http://127.0.0.1:8000/employee/").then((respons)=>setStudent(respons.data)).catch((error)=>console.log(error))
  }
  const deleteStudent = (id)=>{
    axios.delete("http://127.0.0.1:8000/employee/delete/"+id+"/" ).then((respons)=>{
      fetchAfter();
    }).catch((error)=>console.log(error))
  }

  const addStudent = ()=>{
    const data = {
      name:name,
    }
    axios.post("http://127.0.0.1:8000/employee/add/", data).then((respons)=>{
      fetchAfter();
    }).catch((error)=>console.log(error))
  }
    return(
        <View style={styles.container}>
          <View style={styles.inputContainer}>
          <TextInput style={styles.inputField} value={name} onChangeText={text => setName(text)} placeholder={'Name'} placeholderTextColor={'#fff'}/>
          {/* <TextInput style={styles.inputField} value={grade} onChangeText={text => setGrade(text)} placeholder={'Grade'} placeholderTextColor={'#fff'}/> */}
          <TouchableOpacity onPress={() =>addStudent()}>
          <View style={styles.button}>
              <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
          </View>
          
        </TouchableOpacity>
          </View>
           <View style={styles.listHeader}>
                <Text style={styles.text}>Name</Text>
                {/* <Text style={styles.text}>Grade</Text> */}
                <Text style={styles.text}>Action</Text>
            </View>
          {student.map((each)=>{
            return(
              <View style={styles.listHolder}>
                <Text style={styles.text}>{each.name}</Text>
                {/* <Text style={styles.text}>{each.grade}</Text> */}
                <TouchableOpacity onPress={()=>deleteStudent(each.id)}>
                    <MaterialIcons style={styles.delete} name="delete" size={18} color='#fff' />
                </TouchableOpacity>
              </View>
            )
          })}
           
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#36454F',
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        width: 600,
        backgroundColor: "white",
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      listHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#ffff',
        marginHorizontal: 20,
        paddingHorizontal:20
      }, 
      inputField: {
        color: '#fff',
        height: 50,
        flex: 1,
    },
      listHolder:{
        borderColor: '#fff',
        backgroundColor: '#1B1212',
        borderWidth: 1,
        padding:20,
        marginHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
       
      },
      heading: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 30,
        marginBottom: 10,
        marginLeft: 20,
      },
      scrollView: {
        marginBottom: 70,
      },
      taskContainer: {
        marginTop: 20,
      },
      text:{

      },
      inputContainer:{
        borderColor: '#fff',
        backgroundColor: '#1B1212',
        borderWidth: 1,
        marginHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'absolute',
        top: 20,
      }
});
