//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            if (data.error) {
                $content.find('.call').html('Fail: checkio(' +  JSON.stringify(checkioInput[0]) + ',' + JSON.stringify(checkioInput[1]) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput[0]) + ',' + JSON.stringify(checkioInput[1]) + ')');
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(explanation));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + JSON.stringify(checkioInput[0]) + ',' + JSON.stringify(checkioInput[1]) + ')');
                $content.find('.answer').remove();
            }
            //Dont change the code before it

            var canvas = new BoxBallsCanvas();

            canvas.createCanvas($content.find(".explanation")[0], checkioInput[0]);

            this_e.setAnimationHeight($content.height() + 60);

        });

        var $tryit;
        var tCanvas;
        var tooltip = false;
//
        ext.set_console_process_ret(function (this_e, ret) {


            $tryit.find(".checkio-result").html("Result<br>" + ret);
        });

        ext.set_generate_animation_panel(function (this_e) {

            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find('.tryit-content');
            tCanvas = new BoxBallsCanvas();
            tCanvas.createCanvas($tryit.find(".tryit-canvas")[0], "wwbbwwbbww", true);
            tCanvas.createFeedback();
            $tryit.find(".tryit-canvas").mousedown(function (e) {
                e.originalEvent.preventDefault();
            });

            $tryit.find('.bn-random').click(function(e) {
                e.preventDefault();
                tCanvas.randomCircle();
                return false;
            });
            $tryit.find('.bn-check').click(function (e) {
                e.preventDefault();
                var data = tCanvas.getData();
                this_e.sendToConsoleCheckiO(data[0], data[1]);
                e.stopPropagation();
                return false;
            });

        });
        //Your Additional functions or objects inside scope
        //
        //
        //
        function BoxBallsCanvas(options) {
            var colorOrange4 = "#F0801A";

            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";
            var colorBlue4 = "#294270";

            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";
            var colorGrey4 = "#737370";

            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";
            var colorWhite = "#FFFFFF";

            options = options || {};

            var x0 = options.x0 || 10;
            var y0 = options.y0 || 10;

            var radius = options.radius || 20;
            var rowMax = options.rowMax || 5;

            var padding = options.padding || 10;

            var paper;

            var fullSizeX,
                fullSizeY;

            var circleSet;
            var upStep;
            var downStep;
            var stepNumber;

            var obj = this;

            var attrWhite = {"stroke": colorBlue4, "stroke-width": 3, "fill": colorWhite};
            var attrBlack = {"stroke": colorBlue4, "stroke-width": 3, "fill": colorBlue4};
            var attrDisable = {"stroke": colorGrey2, "stroke-width": 3, "fill": colorGrey1};
            var attrStep = {"stroke": colorBlue4, "fill": colorBlue4, "font-size": radius * 1.7, "font-family": "Verdana", "font-weight": "bold"};

            this.createCanvas = function (dom, balls, feedback) {
                var quantity = balls.length;
                var inRow = Math.min(quantity, rowMax);
                var rowQuantity = Math.ceil(quantity / inRow);
                fullSizeX = x0 * 2 + inRow * radius * 2 + (inRow - 1) * padding;
                fullSizeY = y0 * 2 + radius * 2 * rowQuantity + (rowQuantity - 1) * padding;
                if (feedback) {
                    fullSizeY += padding + radius * 2;
                }
                paper = Raphael(dom, fullSizeX, fullSizeY, 0, 0);
                circleSet = paper.set();

                for (var i = 0; i < quantity; i++) {
                    var c = paper.circle(
                        x0 + (i % inRow) * (2 * radius + padding) + radius,
                        y0 + Math.floor(i / inRow) * (2 * radius + padding) + radius,
                        radius
                    );
                    c.attr(balls[i] == "w" ? attrWhite : attrBlack);
                    c.mark = balls[i];
                    c.index = i;
                    circleSet.push(c);
                }

                if (feedback) {
                    stepNumber = paper.text(fullSizeX / 2, fullSizeY - y0 - radius, "1").attr(attrStep);
                    upStep = paper.text(fullSizeX / 2 - radius * 2 - padding, fullSizeY - y0 - radius, "⇑").attr(attrStep);
                    downStep = paper.text(fullSizeX / 2 + radius * 2 + padding, fullSizeY - y0 - radius, "⇓").attr(attrStep);
                    upStep.node.setAttribute("class","pointer");
                    downStep.node.setAttribute("class","pointer");
                }

            };

            this.createFeedback = function () {
                for (var i = 0; i < circleSet.length; i++) {
                    circleSet[i].node.setAttribute("class", "pointer");
                }
                circleSet.click(function (e) {
                    if (this.mark == "w") {
                        this.animate(attrBlack, 100);
                        this.mark = "b";
                    }
                    else if (this.mark == "b" ) {
                        this.animate(attrDisable, 100);
                        this.mark = "-";
                    }
                    else {
                        this.animate(attrWhite, 100);
                        this.mark = "w";
                    }
                });
                upStep.click(function() {
                    var n = Number(stepNumber.attr("text"));
                    stepNumber.attr("text", n < 99 ? n + 1 : 99);
                    return false;
                });
                downStep.click(function() {
                    var n = Number(stepNumber.attr("text"));
                    stepNumber.attr("text", n > 2 ? n - 1 : 1);
                    return false;
                });

            };

            this.getData = function() {
                var balls = "";
                for (var i = 0; i < circleSet.length; i++) {
                    balls += circleSet[i].mark != "-" ? circleSet[i].mark : "";
                }
                return [balls, Number(stepNumber.attr("text"))];
            };

            this.randomCircle = function() {
                var variant = "bw-";
                for (var i = 0; i < circleSet.length; i++) {
                    circleSet[i].mark = variant[Math.floor(Math.random() * 3)];
                    if (circleSet[i].mark == "b") {
                        circleSet[i].attr(attrBlack)
                    }
                    else if (circleSet[i].mark == "w") {
                        circleSet[i].attr(attrWhite);
                    }
                    else {
                        circleSet[i].attr(attrDisable);
                    }
                }
            }

        }


    }
);
