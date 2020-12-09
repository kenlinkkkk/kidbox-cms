const getters = {
    getRules: state =>{
        return state.rules;
    },
    getRule: state => ruleId => state.rules.find((rule) => rule.id === ruleId),
    getRates: state =>{
        return state.rates;
    },
    getRate: state => rateId => state.rates.find((rate) => rate.id === rateId),
    getStatistical: state=>{
      return state.statistical;
    }
}

export default getters
