import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import {
  View,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView, //para os campos inputs irem pra cima
  Platform,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface UFResponse {
  nome: [];
  sigla: [];
}

interface CityResponse {
  nome: string;
}

const Home = () => {
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [ufList, setUfList] = useState<UFResponse[]>([]);
  const [cityList, setCityList] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf,
      city,
    });
  }
  useEffect(() => {
    (async function () {
      const response = await axios.get<UFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      );

      const data = response.data.map(function (item) {
        const obj = {
          nome: item.nome,
          sigla: item.sigla,
        };
        return obj;
      });

      setUfList(data);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const response = await axios.get<CityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
      );
      const data = response.data.map(item => item.nome);
      
      setCityList(data);
    })();
  }, [uf]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>
              Seu Marketplace de coleta de resíduos
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <RNPickerSelect
            placeholder={{
              label: 'Selecione seu estado',
              value: null,
              color: '#aaa',
              displayValue: false,
            }}
            onValueChange={value => setUf(value)}
            items={ufList.map(item => ({
              label: item.nome,
              value: item.sigla,
            }))}
          />

          <RNPickerSelect
            placeholder={{
              label: 'Selecione sua cidade',
              value: null,
              color: '#aaa',
              displayValue: false,
            }}
            onValueChange={value => setCity(value)}
            items={cityList.map(item => ({
              label: item,
              value: item,
            }))}
          />
          {/* <TextInput
            style={styles.input}
            onChangeText={setUf}
            value={uf}
            placeholder='Digite a UF'
            maxLength={2}
            autoCorrect={false}
            autoCapitalize='characters'
          />
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            autoCorrect={false}
            placeholder='Digite a cidade'
          /> */}
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name='arrow-right' color='#fff' size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
});

export default Home;
