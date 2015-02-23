/*
 Copyright (c) 20015, Rod Mcnew (rodmcnew@gmail.com)
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice, this
 list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 The views and conclusions contained in the software and documentation are those
 of the authors and should not be interpreted as representing official policies,
 either expressed or implied, of the FreeBSD Project.
 */

if ($('body.axo-layout').length > 0) {
    var editLinkText = 'Edit Initial Estimate';
    var points = [0, 1, 2, 3, 5, 8, 13, 20, 40, 60, 100];

    function storyPointClick() {
        var aTag = $(this);
        var editA = aTag.closest('ul').find("a.axo-menuitem-content:contains('" + editLinkText + "')");
        editA[0].click();
        setStoryPointsAndCloseWindow(aTag.html());
    }

    function setStoryPointsAndCloseWindow(points) {
        var interval = setInterval(
            function () {
                var durationInputBox = $('input#estimated_duration');
                if (durationInputBox.length == 0) {
                    return;
                }
                clearInterval(interval);
                durationInputBox.val(points);
                $('button.saveAndClose')[0].click();
            },
            200
        );
    }

    function addMenuItems(ul) {
        //add divider
        var divider = $('<li class="axo-menuitem-divider fibonacci-story-point-menu"><a></a></li>');
        ul.prepend(divider);

        $.each(points, function (key, points) {
            li = $('<li class="axo-menuitem-button fibonacci-story-point-menu"></li>');
            ul.prepend(li);
            var a = $('<a class="axo-menuitem-content">' + points + ' points</a>');
            li.append(a);
            a.click(storyPointClick);
        });
    }

    setInterval(
        function () {
            var estimateLi = $("a.axo-menuitem-content:contains('" + editLinkText + "')").parent();

            if (estimateLi.length == 0) {
                //Remove them if we don't have the Edit Initial Estimate option in the menu
                if ($('.fibonacci-story-point-menu').length > 0) {
                    $('.fibonacci-story-point-menu').remove();
                }
                return;
            } else {
                var alreadyAdded = estimateLi.parent().find('li.fibonacci-story-point-menu');
                if (alreadyAdded.length > 0) {
                    return;
                }
            }

            addMenuItems(estimateLi.parent());
        },
        200
    );
}