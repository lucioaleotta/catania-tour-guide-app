// app/components/ui/CategoryFilter.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTranslations } from '@utils/translations';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { apiService } from '@services/api';

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

export default function CategoryFilter({
    categories,
    selectedCategory,
    onSelectCategory
}: CategoryFilterProps) {
    const { t, getCategoryTranslation } = useTranslations();

    // Mappa icone per categoria 
    const getCategoryIcon = (category: string) => {
        const categoryLower = category.toLowerCase();

        switch (categoryLower) {
            case 'chiesa':
            case 'chiese':
                return <FontAwesome5 name="church" size={16} color={selectedCategory === category ? "white" : "purple"} style={styles.categoryIcon} />;
            case 'museo':
            case 'musei':
                return <FontAwesome5 name="museum" size={16} color={selectedCategory === category ? "white" : "brown"} style={styles.categoryIcon} />;
            case 'piazza':
                return <FontAwesome5 name="city" size={16} color={selectedCategory === category ? "white" : "blue"} style={styles.categoryIcon} />;
            case 'teatro':
            case 'teatri':
            case 'arena':
                return <FontAwesome5 name="theater-masks" size={16} color={selectedCategory === category ? "white" : "orange"} style={styles.categoryIcon} />;
            case 'palazzo':
            case 'palazzi':
                return <FontAwesome5 name="building" size={16} color={selectedCategory === category ? "white" : "gray"} style={styles.categoryIcon} />;
            case 'fontana':
            case 'fontane':
                return <FontAwesome5 name="fountain" size={16} color={selectedCategory === category ? "white" : "cyan"} style={styles.categoryIcon}/>;
            case 'parco':
            case 'parchi':
                return <FontAwesome5 name="tree" size={16}  color={selectedCategory === category ? "white" : "green"} style={styles.categoryIcon}/>;
            case 'mercato':
            case 'mercati':
                return <FontAwesome5 name="shopping-basket" size={16} color={selectedCategory === category ? "white" : "orange"} style={styles.categoryIcon}/>;
            case 'castello':
            case 'castelli':
                return <MaterialIcons name="castle" size={16} color={selectedCategory === category ? "white" : "black"} style={styles.categoryIcon}/>
            case 'monastero':
            case 'monasteri':
                return <FontAwesome5 name="cross" size={16} color={selectedCategory === category ? "white" : "darkred"} style={styles.categoryIcon}/>;
            case 'monumento':
            case 'monumenti':
                return <FontAwesome5 name="monument" size={16} color={selectedCategory === category ? "white" : "green"} style={styles.categoryIcon}/>;
            case 'food':
                return <FontAwesome5 name="utensils" size={16} color={selectedCategory === category ? "white" : "orange"} style={styles.categoryIcon}/>;
            default:
                return <FontAwesome5 name="map-marker-alt" size={16} color={selectedCategory === category ? "white" : "red"} style={styles.categoryIcon} />;
        }
    };

    return (
        <View style={styles.filterContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                <TouchableOpacity
                    style={[
                        styles.categoryButton,
                        selectedCategory === null && styles.selectedCategoryButton
                    ]}
                    onPress={() => onSelectCategory(null)}
                >
                    <Text style={[
                        styles.categoryText,
                        selectedCategory === null && styles.selectedCategoryText
                    ]}>
                        {t('allCategories')}
                    </Text>
                </TouchableOpacity>

                {categories.map(category => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category && styles.selectedCategoryButton
                        ]}
                        onPress={() => onSelectCategory(category)}
                    >
                        {getCategoryIcon(category)}
                        <Text style={[
                            styles.categoryText,
                            selectedCategory === category && styles.selectedCategoryText
                        ]}>
                            {getCategoryTranslation(category)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    filterContainer: {
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginHorizontal: 5,
        backgroundColor: '#f0f0f0',
    },
    selectedCategoryButton: {
        backgroundColor: '#2196F3',
    },
    categoryText: {
        fontSize: 14,
    },
    selectedCategoryText: {
        color: 'white',
        fontWeight: '600',
    },
    categoryIcon: {
        marginRight: 6
    }
});