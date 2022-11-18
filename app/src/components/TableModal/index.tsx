import { Modal, TouchableOpacity } from 'react-native';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Platform } from 'react-native';
import { Overlay, ModalBody, Header, Form, Input } from './styles';
import { useState } from 'react';

interface ITableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave }: ITableModalProps) {

  const [table, setTable] = useState('');

  function handleSave() {
    onSave(table);
    onClose();
  };

  return (

    <Modal
      visible={visible}
      transparent
      animationType='fade'
    >
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight="600">Informe a mesa</Text>
            <TouchableOpacity onPress={(onClose)}>
              <Close color="#666" />
            </TouchableOpacity>

          </Header>

          <Form>
            <Input
              placeholder='Número da mesa'
              placeholderTextColor={'#666'}
              keyboardType='number-pad'
              onChangeText={setTable}
            />
            <Button onPress={handleSave} disabled={table.length === 0} >
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal >


  );
}
