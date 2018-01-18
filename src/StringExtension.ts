// インターフェイス統合によるコアクラスの拡張
declare interface String {
  normalizeNewLine(): string;
}

String.prototype.normalizeNewLine = function () {
  return this.replace(/\r?\n/g, '\r\n');
};
