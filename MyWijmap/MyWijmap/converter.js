﻿var Wijmap;
(function (Wijmap) {
    var CoordConverter = (function () {
        function CoordConverter() {
        }
        //将经纬度转化为百分比的逻辑坐标
        CoordConverter.geographicToLogic = function (position) {
            var min = 0, max = 0.9999999999;
            var point = new Wijmap.Point((position.x + 180) / 360, (1 - Math.log(Math.tan(position.y * Math.PI / 180) + 1 / Math.cos(position.y * Math.PI / 180)) / Math.PI) / 2);

            if (point.x < min)
                point.x = min;
            if (point.y < min)
                point.y = min;
            if (point.x > max)
                point.x = max;
            if (point.y > max)
                point.y = max;

            return point;
        };

        //百分比转化为像素
        CoordConverter.logicToView = function (position, zoom) {
            return new Wijmap.Point(position.x * Math.pow(2, zoom) * 256, position.y * Math.pow(2, zoom) * 256);
        };

        //将百分比转换为经纬度
        CoordConverter.logicToGeographic = function (point) {
            var n = Math.PI - 2 * Math.PI * point.y;
            return new Wijmap.Point((point.x * 360 - 180), 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
        };

        //将经纬度坐标转化为像素坐标并设置为center
        CoordConverter.geographicToViewCenter = function (position, element, zoom) {
            var blockX, blockY, x, y, point = this.logicToView(this.geographicToLogic(position), zoom);

            blockX = Math.floor(point.x / 256);
            blockY = Math.floor(point.y / 256);

            x = point.x % 256, y = point.y % 256;

            return new Wijmap.Tile(new Wijmap.Point(element.offset().left + 756 / 2 - x, element.offset().top + 475 / 2 - y), blockX, blockY, zoom);
        };
        return CoordConverter;
    })();
    Wijmap.CoordConverter = CoordConverter;
})(Wijmap || (Wijmap = {}));
//# sourceMappingURL=converter.js.map
