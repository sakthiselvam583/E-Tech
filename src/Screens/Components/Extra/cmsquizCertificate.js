import React from 'react';
import { Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';
const QuizCertificate = ({ userName = "ram", courseName, date, PreScore, PostScore }) => {
  return (
    <Document>
      <Page>
        <View style={styles.full}>
          <View style={styles.body}>
            <Text style={styles.header}>Dear {userName},{'\n\n'}</Text>
            <Text style={styles.second}>This is to certify that you have completed the E-learning course {courseName} on {date}.{'\n\n'}Your evaluation scores are as listed:{'\n'}Pre-program evaluation  - {PreScore}%{'\n'}Post-program evaluation - {PostScore}%{'\n\n\n'}Regards,{'\n\n\n'}Name of Signatory</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
const styles = StyleSheet.create({
  full: {
    padding: 20,
    textAlign: 'center',
    border: 10,
    borderColor: '#787878',
  },
  body: {
    padding: 20,
    textAlign: 'center',
    border: 5,
    borderColor: '#787878',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  second: {
    fontSize: 14,
    font:'italic',
  },
  center: {
    textAlign: 'center'
  },

});

export default QuizCertificate;
