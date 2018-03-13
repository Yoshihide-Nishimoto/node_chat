var model = require('./model/post');

var Post = model.Post;

var post = new Post({
    title: 'たいとる',
    content: 'なかみ',
    author: 'ちょしゃ',
    created_at: 'つくったひ',
    updated_at: 'こうしんしたひ'
});

// ドキュメントの保存
post.save(function(err) {
    console.log("保存しました");
    if (err) throw err;
});
