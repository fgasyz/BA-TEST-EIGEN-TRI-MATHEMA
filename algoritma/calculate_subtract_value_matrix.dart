void calculateSubtractValueFromMatrix(List<List<int>> matrix) {
  late List<int> arryPrimaryDiagonal = [];
  late List<int> arrySecondaryDiagonal = [];
  int result = 0;
  int countPrimaryDiagonal = 0;
  int countSecondaryDiagonal = 0;

  print(matrix.toString());

  for (var i = 0; i < matrix.length; i++) {
    arryPrimaryDiagonal.add(matrix[i][i]);
    arrySecondaryDiagonal.add(matrix[i][matrix.length - 1 - i]);
  }

  countPrimaryDiagonal =
      arryPrimaryDiagonal.reduce((value, element) => value + element);
  countSecondaryDiagonal =
      arrySecondaryDiagonal.reduce((value, element) => value + element);

  result = countPrimaryDiagonal - countSecondaryDiagonal;

  print('First diagonal : ' +
      arryPrimaryDiagonal.join(' + ') +
      ' = ' +
      countPrimaryDiagonal.toString());
  print('Second diagonal : ' +
      arrySecondaryDiagonal.join(' + ') +
      ' = ' +
      countSecondaryDiagonal.toString());
  print('The result is : ' + result.toString());
}
