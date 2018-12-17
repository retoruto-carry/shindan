const json = {
    "title": 'あなたのうぇい度がわかるボタン',
    "lavel": 'うえーーーい',
    "template": '[名前]のうぇい度は[list1]%です。[list2]',
    "lists": [
        ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],
        ["ウェーイww",　"(☝ ՞ਊ ՞)☝ｳｪｰｲ", "(☝ ՞ਊ ՞)☝ｳｪｰｰｰｰｰｲwwww", "ウェーイwwwwwww"]
    ],
    "change": "everyday",
    "hashtag": 'あなたのうぇい度がわかるボタン',
    "author": 'れとるときゃりー',
}

const app = new Vue({
    el: '#app',
    data: {
        template: json.template,
        lists: json.lists,
        change: json.change,
        hashtag: json.hashtag,
        name: '',
        result: '',
        shindanBtnShow: true
    },
    methods: {
        shindan: function () {

            this.result = this.template;

            if (this.name) {
                this.result = this.result.replace(/\[名前]/g, this.name);
            } else {
                this.result = this.result.replace(/\[名前]/g, '名無し');
            }

            this.replaceLists();

            this.shindanBtnShow = false;

        },
        tweetResult: function () {
            this.customTweet(this.result);
        },
        tweet: function () {
            let shareURL =  "https://twitter.com/share?url=https://retoruto-carry.github.io/shindan/index2.html&text=%23" + encodeURIComponent(this.hashtag);
            window.open(shareURL);
        },
        customTweet: function (text) {
            let shareURL =  "https://twitter.com/share?url=https://retoruto-carry.github.io/shindan/index2.html&text=" + encodeURIComponent(text) + "%0a%23" + encodeURIComponent(this.hashtag);
            window.open(shareURL);
        },
        replaceLists: function () {

            let seed = this.calcSeed();
            console.log("seed: " + seed);
            let my_chance = new Chance(seed);

            this.lists.forEach( (row, index)  => {

                if (this.name) {
                    random = row[my_chance.natural({min: 0, max: row.length-1})];
                } else {
                    random = row[Math.floor(Math.random() * row.length)];
                }
                
                console.log(random);

                var targetStr = "\\[list" + String(index+1) + "\\]" ;
                var regExp = new RegExp(targetStr, "g" ) ;

                this.result = this.result.replace(regExp, random);

            });

        },
        calcSeed: function () {
            let today = new Date();
            switch (this.change){
                  case "everytime":
                    return this.name + today.getTime();
                    break;
                  case "everyday":
                    return this.name + today.getFullYear() + today.getMonth() + today.getDate();
                    break;
                  case "constant":
                    return this.name;
                    break;
            }
            
        }
        
    },

})
