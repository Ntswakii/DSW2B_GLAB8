import React, { useState } from 'react';
import { 
  Alert, 
  FlatList, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native';

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const text = taskText.trim();
    if (!text) {
      Alert.alert('Empty task', 'Type something first');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      text,
      done: false
    };

    setTasks([newTask, ...tasks]);
    setTaskText('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const tasksLeft = tasks.filter(t => !t.done).length;

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleTask(item.id)}>
        <Text style={styles.checkbox}>
          {item.done ? "☑️" : "⬜"}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.taskText, item.done && styles.taskTextDone]}>
        {item.text}
      </Text>

      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Task List</Text>

      <View style={styles.row}>
        <TextInput
          value={taskText}
          onChangeText={setTaskText}
          placeholder="Enter a task"
          style={styles.input}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.counter}>
        {tasksLeft} {tasksLeft === 1 ? "task" : "tasks"} left
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#adeadcff',
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#035042bb'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#155343bb',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginLeft: 20,
    
  },
  addButton: {
    backgroundColor: '#035042bb',
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight:20,
    borderRadius: 4,
  },
  addText: {
    color: 'white',
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    textAlign: 'center',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#155343bb',
    marginLeft: 20,
    marginRight:20,
  },
  checkbox: {
    fontSize: 18,
    marginRight: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: 'red',
  },
  deleteButton: {
    fontSize: 18,
    marginLeft: 10,
    
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});
