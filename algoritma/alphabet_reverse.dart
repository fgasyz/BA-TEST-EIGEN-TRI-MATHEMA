void reverseAlphabet(String words) {
  late String result;
  late List charList;

  print("Original string : " + words);

  charList = words.split('');
  result = charList[charList.length - 1];
  charList = charList.sublist(0, words.length - 1).reversed.toList();
  result = charList.join('') + result;

  print("Update string : " + result);
}
