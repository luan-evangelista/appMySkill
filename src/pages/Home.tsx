import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    FlatList
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
    id: string;
    name: string;
}

export function Home() {
    const [newSkills, setNewSkills] = useState('');
    const [mySkills, setMySkills] = useState<SkillData[]>([]);
    const [gretting, setGretting] = useState('');

    function handleAddNewSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: newSkills
        }

        setMySkills(oldStateSkill => [...oldStateSkill, data]);
    }

    function handleRemoveSkill(id: string) {
        setMySkills(oldStateSkill => oldStateSkill.filter(
            skill => skill.id !== id
        ));
    }

    // useEffect recebe dois parâmetros: 1º. Função que ele precisa executar, 2º. Array de Dependências
    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            setGretting('Good Morning');
        }
        else if (currentHour >= 12 && currentHour < 18) {
            setGretting('Good Afternoon');
        } else {
            setGretting('Good Night');
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Welcome, Luan
            </Text>

            <Text style={styles.greetings}>
                {gretting}
            </Text>

            <TextInput
                style={styles.input}
                placeholder='New Skill'
                placeholderTextColor='#555'
                onChangeText={setNewSkills}
            />

            <Button
                onPress={handleAddNewSkill}
                title="Add"
            />

            <Text style={[styles.title, { marginVertical: 50 }]}>
                My Skills
            </Text>

            <FlatList
                data={mySkills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <SkillCard
                        skill={item.name}
                        onPress={() => handleRemoveSkill(item.id)}
                    />
                )}
            />

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
    greetings: {
        color: '#FFF'
    }
})
