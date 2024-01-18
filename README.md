# interview-copybase
interview for copybase application

A ideia é ter no mesmo projeto tanto o backend quanto o frotend

## Entendimentos

## **Monthly Recurring Revenue (MRR)**:

> É a receita recorrente mensal. Trata-se da **soma de todas as receitas recorrentes geradas por uma empresa em um mês**. Para calcular o MRR, você soma todas as receitas recorrentes mensais de todos os clientes.

## **Churn Rate**: 

> É a taxa de cancelamento. Mede a porcentagem de clientes ou receita que foi perdida em um determinado período devido a cancelamentos ou não renovações. Para calcular a Churn Rate, divide-se o número de clientes perdidos em um determinado período pelo número total de clientes no início desse período, e então multiplica-se o resultado por 100 para obter a porcentagem.


### O arquivo contém as seguintes colunas:

* **quantidade cobranças**: Número de cobranças realizadas.
* **cobrada a cada X dias**: Frequência das cobranças.
* **data início**: Data de início da assinatura.
* status: Status atual da assinatura (Ativa ou Cancelada).
* data status: Data da última atualização de status.
* **data cancelamento**: Data de cancelamento da assinatura, se aplicável.
* **valor**: Valor da assinatura.
* próximo ciclo: Data do próximo ciclo de cobrança.
* **ID assinante**: Identificador do assinante


### Portanto:

* MRR: somar os valores das assinaturas ativas
* Churn Rate: comparar o número de assinaturas canceladas em um determinado período com o número total de assinaturas ativas no início desse período.


```python
from datetime import datetime

# Converter as datas para formato datetime
data['data início'] = pd.to_datetime(data['data início'], dayfirst=True)
data['data status'] = pd.to_datetime(data['data status'], dayfirst=True)
data['data cancelamento'] = pd.to_datetime(data['data cancelamento'], dayfirst=True)
data['próximo ciclo'] = pd.to_datetime(data['próximo ciclo'], dayfirst=True)

# Converter o valor para número, substituindo vírgula por ponto
data['valor'] = data['valor'].str.replace(',', '.').astype(float)

# Filtrar os dados para o último mês completo disponível no dataset
# Considerar a data do próximo ciclo para determinar o mês de referência
last_month = data['próximo ciclo'].max().replace(day=1) # Primeiro dia do mês seguinte ao último registro
month_data = data[(data['próximo ciclo'] < last_month) & (data['data início'] < last_month)]

# Calcular MRR - somar os valores das assinaturas ativas
mrr = month_data[month_data['status'] == 'Ativa']['valor'].sum()

# Calcular Churn Rate
# Número total de clientes no início do mês
total_clients_start = month_data['ID assinante'].nunique()

# Número de clientes perdidos durante o mês
lost_clients = month_data[(month_data['status'] == 'Cancelada') & 
                          (month_data['data cancelamento'] >= last_month.replace(month=last_month.month-1)) &
                          (month_data['data cancelamento'] < last_month)]['ID assinante'].nunique()

# Churn Rate
churn_rate = (lost_clients / total_clients_start) * 100 if total_clients_start > 0 else 0

mrr, churn_rate, last_month
```

---


### fluxo

-> usuário entrar na página
    -> poder escolher o arquivo

-> inserir o arquivo
    -> pegar esse arquivo binário ou json
    -> jogar para dentro do banco de dados

-> criar job
    -> verificar o progresso
    -> mostrar o resultado no front

-> visualizar os dados de um gráfico