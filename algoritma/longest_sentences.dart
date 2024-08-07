void getLongestSentence(String sentences) {
  String result = '';
  List<String>? sentenceTemp = [];
  RegExp regExp = RegExp(r'\s+');
  List<String> arrySentencesTemp = sentences.split(regExp);
  
  print('Original sentence : ' + sentences);
  
  for (String sentences in arrySentencesTemp) {
    sentenceTemp = sentences.split(regExp);
    for (String sentence in sentenceTemp) {
      if (sentence.length > result.length) {
        result = sentence;
      }
    }
  }
  result = result + ' : ' + result.length.toString() + ' character';
  
  print('Longest sentence : ' + result);
}
