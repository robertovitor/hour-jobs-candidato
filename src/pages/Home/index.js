import React, { useEffect, useState } from 'react';
import { View, StatusBar, Text, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
// import api from '../../services/api';
import styles from './styles';
import Card from '../../components/Card';
import ProfilePhoto from '../../../assets/img/profile.jpeg';

const Home = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async () => {
      // const response = await api.get('/vaga');

      setJobs([
        {
          id: '1',
          cargo: 'Vendedora',
          empresa: 'Mariana Silva ME',
          descricao:
            'Atendimento ao cliente e venda de produtos de material de construção, acabamentos, elétricos e hidráulicos.',
          bairro: 'Santana, SP',
          perfilDaVaga: true,
          periodo: 4,
          remuneracao: 200,
          status: 'ABERTO',
        },
        {
          id: '2',
          cargo: 'Vendedora',
          empresa: 'Vitória Restaurante',
          bairro: 'Vila Mariana, SP',
          descricao:
            'Irá executar atividades de vendas de produtos alimentícios.',
          perfilDaVaga: true,
          periodo: 6,
          remuneracao: 150,
          status: 'ABERTO',
        },
      ]);
    })();
  }, []);

  return (
    <>
      <StatusBar animated backgroundColor="#fff" barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.container, { paddingTop: 10 }]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <Text style={styles.title}>Olá, Eliane!</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image style={styles.userImage} source={ProfilePhoto} />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Vagas disponíveis</Text>
          <FlatList
            data={jobs}
            renderItem={({ item }) => (
              <Card navigation={navigation} key={item.id} item={item} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
