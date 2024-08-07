void calculateOccurArrayOfQuery(List arrayInput, List arrayQuery) {
  late List result = [];
  Map<String, int> objTemp = {};

  print('INPUT : ' + arrayInput.toString());
  print('QUERY : ' + arrayQuery.toString());

  for (String element in arrayInput) {
    if (objTemp.containsKey(element)) {
      objTemp[element] = objTemp[element]! + 1;
    } else {
      objTemp[element] = 1;
    }
  }
  for (String element in arrayQuery) {
    result.add(objTemp[element] ?? 0);
  }

  print('OUTPUT : ' + result.toString());
}
