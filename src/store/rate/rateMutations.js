const mutations = {
  SET_LIST_RULES(state, rules) {
    state.rules = rules;
  },
  SET_SCROLL_RULES(state, rules) {
    rules.forEach(element => {
      state.rules.push(element)
    });
  },
  SET_LIST_RATES(state, rates) {
    state.rates = rates
  },
  SET_CROLL_RATES(state, rates) {
    rates.forEach(element => {
      state.rates.push(element)
    });
  },
  UPDATE_RULE_FILTER(state, filter){
    state.ruleFilter = filter;
  },
  ADD_RULE (state, rule) {
    state.rules.unshift(rule)
  },
  SET_STATISTICAL(state, statistical){
    state.statistical = statistical
  }
};

export default mutations;
