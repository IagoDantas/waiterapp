import { IOrder } from '../../types/Order'
import { OrdersBoard } from '../OrdersBoard'
import { Container } from './styles'

const orders: IOrder[] = [
  {
    "_id": "6373dc562c4f30a883c0aa31",
    "table": "123",
    "status": "WAITING",
    "products": [
      {
        "product": {
          "name": "Pizza quatro queijos",
          "imagePath": "1668535779159-quatro-queijos.png",
          "price": 40,
        },
        "quantity": 3,
        "_id": "6373dc562c4f30a883c0aa32"
      },
      {
        "product": {
          "name": "Coca cola",
          "imagePath": "1668536543530-coca-cola.png",
          "price": 7,
        },
        "quantity": 2,
        "_id": "6373dc562c4f30a883c0aa33"
      }
    ],
  }
]

export function Orders() {
  return (
    <Container>
      <OrdersBoard
        icon="🕓"
        title="Fila de espera"
        orders={orders}
      />
      <OrdersBoard
        icon="👩‍🍳"
        title="Em produção"
        orders={[]}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={[]}
      />
    </Container>
  )
}
