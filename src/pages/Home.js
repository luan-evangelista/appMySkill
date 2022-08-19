import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,  
    Platform,
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

export function Home() {
    const [newSkills, setNewSkills] = useState('');
    const [mySkills, setMySkills] = useState([]);

    function handleAddNewSkill() {
        setMySkills(oldStateSkill => [...oldStateSkill, newSkills]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Welcome, Luan
            </Text>

            <TextInput
                style={styles.input}
                placeholder='New Skill'
                placeholderTextColor='#555'
                onChangeText={setNewSkills}
            />

            <Button onPress={handleAddNewSkill} />

            <Text style={[styles.title, { marginVertical: 50 }]}>
                My Skills
            </Text>

            {
                mySkills.map(skill => (
                    <SkillCard skill={skill} />
                ))
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 30,
        paddingVertical: 70,
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#1F1E25',
        color: '#FFF',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 30,
        borderRadius: 7
    },
})
