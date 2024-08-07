import 'alphabet_reverse.dart';
import 'calculate_occur_array.dart';
import 'calculate_diagonal_matrix.dart';
import 'longest_sentences.dart';

void main() {
  print('===== TASK 1 =====');
  reverseAlphabet('NEGIE1');
  print('\n===== TASK 2 =====');
  getLongestSentence(
      "Saya sangat senang mengerjakan soal algoritma mengerjakan");
  print('\n===== TASK 3 =====');
  calculateOccurArrayOfQuery(
      ['xc', 'dz', 'bbb', 'dz', 'dz'], ['bbb', 'ac', 'dz']);
  print('\n===== TASK 4 =====');
  calculateDiagonalValueFromMatrix([
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
  ]);
}
