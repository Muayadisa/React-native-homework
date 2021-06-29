import {ActivityIndicator, StyleSheet} from 'react-native'
import {COLORS} from "../utils/utils";
import React from "react";

export default function ({isLoading}) {
    return(
        isLoading ? <ActivityIndicator size="large" color={COLORS.DARK} style={styles.loading} />
        : null
    )
}

const styles = StyleSheet.create({
    loading: {position: 'absolute'}
});
