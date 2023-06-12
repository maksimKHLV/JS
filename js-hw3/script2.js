var fraction = {
    numerator: 0,
    denominator: 1,

    setFraction: function (numerator,denominator){
        this.numerator = numerator;
            this.denominator = denominator;
    },
    add: function  (fraction2 ){
        var resultNumerator = this.numerator * fraction2.denominator + fraction2.numerator * this.denominator;
        var resultDenominator = this.denominator * fraction2.denominator;
        return createFraction(resultNumerator, resultDenominator);
    },
    subtract: function  (fraction2 ){
        var resultNumerator = this.numerator * fraction2.denominator - fraction2.numerator * this.denominator;
        var resultDenominator = this.denominator * fraction2.denominator;
        return createFraction(resultNumerator, resultDenominator);
    },
   multiply: function  (fraction2 ){
        var resultNumerator = this.numerator * fraction2.numerator;
        var resultDenominator = this.denominator * fraction2.denominator;
       return createFraction(resultNumerator, resultDenominator);
    },
    divide: function(fraction2) {
            var resultNumerator = this.numerator * fraction2.denominator;
            var resultDenominator = this.denominator * fraction2.numerator;
            return createFraction(resultNumerator, resultDenominator);
        },
};
    function createFraction(numerator, denominator) {
        var newFraction = Object.create(fraction);
        newFraction.setFraction(numerator, denominator);
        return newFraction;
    }

    var fraction1 = createFraction(1,3);
    var fraction2 = createFraction(3,1);

    var result = fraction1.add(fraction2);
    var result2 = fraction1.subtract(fraction2);
    var result3 = fraction1.multiply(fraction2);

   prompt(" Result (1/3) + (3/1) =  " + result.numerator + "/" + result.denominator);
   prompt(" Result (1/3) - (3/1) =  " + result2.numerator + "/" + result2.denominator);
   prompt(" Result (1/3) * (3/1) =  " + result3.numerator + "/" + result3.denominator);
